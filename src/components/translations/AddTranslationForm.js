'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitTranslation as addTranslation } from '@/lib/translations'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function AddTranslationForm({
  termId,
  languageId,
  onTranslationAdded,
  translations,
  userId,
  children,
  hasSubmittedTranslation,
  localeLanguageData,
  user,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const translationSchema = z.object({
    translation: z
      .string()
      .min(1, 'Translation cannot be empty')
      .refine(
        value => {
          // Check if the translation already exists
          const existingTranslation = translations.find(
            t => t.translation.toLowerCase() === value.toLowerCase(),
          )
          // If it exists and was submitted by the same user, return false
          if (existingTranslation) {
            const userSubmittedBefore =
              existingTranslation.translation_submissions.some(
                submission => submission.user_id === userId,
              )
            return !userSubmittedBefore
          }
          return true
        },
        {
          message: 'You have already submitted this translation',
        },
      ),
  })

  const form = useForm({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      translation: '',
    },
  })

  const handleAddTranslation = async data => {
    setIsSubmitting(true)
    const { translation } = data

    const existingTranslation = translations.find(
      t => t.translation.toLowerCase() === translation.toLowerCase(),
    )

    if (existingTranslation) {
      const optimisticTranslation = {
        ...existingTranslation,
        votes: {
          ...existingTranslation.votes,
          upvotes: existingTranslation.votes.upvotes + 1,
        },
        translation_submissions: [
          ...(existingTranslation.translation_submissions || []),
          {
            profiles: {
              display_name: user.display_name,
              avatar_url: user.avatar_url,
            },
          },
        ],
      }

      onTranslationAdded(optimisticTranslation, existingTranslation.id)

      try {
        const updatedTranslation = await addTranslation(
          termId,
          languageId,
          translation,
          userId,
        )
        form.reset()

        onTranslationAdded(
          { ...optimisticTranslation, ...updatedTranslation },
          existingTranslation.id,
        )
      } catch (error) {
        alert(error.message)
        onTranslationAdded(existingTranslation, existingTranslation.id)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      const optimisticTranslation = {
        id: Date.now(),
        term_id: termId,
        language_id: languageId,
        translation,
        votes: {
          upvotes: 1,
          downvotes: 0,
        },
        user_id: userId,
        translation_submissions: [
          {
            profiles: {
              display_name: user.display_name,
              avatar_url: user.avatar_url,
            },
          },
        ],
      }

      onTranslationAdded(optimisticTranslation)

      try {
        const newTranslation = await addTranslation(
          termId,
          languageId,
          translation,
          userId,
        )
        form.reset()

        onTranslationAdded(
          { ...optimisticTranslation, ...newTranslation },
          optimisticTranslation.id,
        )
      } catch (error) {
        alert(error.message)
        onTranslationAdded(null, optimisticTranslation.id)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddTranslation)}
        className="space-y-4"
      >
        <FormItem>
          <Label htmlFor="translation">
            into <strong>{localeLanguageData.localName}</strong>
          </Label>
          <FormControl>
            <Input
              id="translation"
              type="text"
              {...form.register('translation')}
              placeholder="Translation"
              disabled={isSubmitting}
              className="border-b-grey-300 m-0 rounded-none border-0 border-b bg-inherit py-8 text-[32px]"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors.translation && (
              <span>{form.formState.errors.translation.message}</span>
            )}
          </FormMessage>
        </FormItem>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SubmissionState
            hasSubmittedTranslation={hasSubmittedTranslation}
            isSubmitting={isSubmitting}
          >
            {children}
          </SubmissionState>
        </div>
      </form>
    </Form>
  )
}

const SubmissionState = ({
  isSubmitting,
  children,
  hasSubmittedTranslation,
}) => {
  if (hasSubmittedTranslation === true) {
    return (
      <>
        <Button variant="outline" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Suggest another'}
        </Button>
        {children}
      </>
    )
  } else {
    return (
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Suggest translation'}
      </Button>
    )
  }
}
