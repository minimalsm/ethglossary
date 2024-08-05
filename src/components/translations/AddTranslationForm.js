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
import CheckDecagramGreen from '@/components/icons/CheckDecagramGreen'
// import { ExclamationCircleIcon } from '@heroicons/react/solid'

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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translationSchema = z.object({
    translation: z
      .string()
      .min(
        1,
        'It looks like your translation is empty. Please enter a translation before submitting.',
      )
      .refine(
        value => {
          const existingTranslation = translations.find(
            t => t.translation.toLowerCase() === value.toLowerCase(),
          )
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

  // Extracting error state for cleaner code
  const translationError = form.formState.errors.translation

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

        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
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

        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
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
        className="relative space-y-4"
      >
        <FormItem>
          <Label htmlFor="translation">
            into <strong>{localeLanguageData.localName}</strong>
          </Label>
          <div className="relative">
            <Input
              id="translation"
              type="text"
              {...form.register('translation')}
              placeholder="Enter translation"
              disabled={isSubmitting}
              className={`text-3.5xl m-0 rounded-none border-0 border-b bg-inherit py-8 pl-1 pr-10 font-serif placeholder:text-[#3A3E50] focus-visible:border-b-2 focus-visible:border-black ${
                translationError ? 'border-destructive-foreground' : ''
              }`}
            />
            {translationError && (
              <svg
                className="absolute right-0 top-1/2 mr-3 h-5 w-5 -translate-y-1/2 transform text-destructive"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1335 15.9334H13.5335V18.3334H11.1335V15.9334ZM11.1335 6.33337H13.5335V13.5334H11.1335V6.33337ZM12.3335 0.333374C5.6975 0.333374 0.333496 5.73337 0.333496 12.3334C0.333496 15.516 1.59778 18.5682 3.84821 20.8187C4.96252 21.933 6.28539 22.8169 7.74129 23.4199C9.1972 24.023 10.7576 24.3334 12.3335 24.3334C15.5161 24.3334 18.5683 23.0691 20.8188 20.8187C23.0692 18.5682 24.3335 15.516 24.3335 12.3334C24.3335 10.7575 24.0231 9.19708 23.4201 7.74117C22.817 6.28527 21.9331 4.9624 20.8188 3.84809C19.7045 2.73379 18.3816 1.84988 16.9257 1.24682C15.4698 0.643763 13.9094 0.333374 12.3335 0.333374ZM12.3335 21.9334C9.78742 21.9334 7.34562 20.9219 5.54527 19.1216C3.74492 17.3213 2.7335 14.8795 2.7335 12.3334C2.7335 9.7873 3.74492 7.3455 5.54527 5.54515C7.34562 3.7448 9.78742 2.73337 12.3335 2.73337C14.8796 2.73337 17.3214 3.7448 19.1217 5.54515C20.9221 7.3455 21.9335 9.7873 21.9335 12.3334C21.9335 14.8795 20.9221 17.3213 19.1217 19.1216C17.3214 20.9219 14.8796 21.9334 12.3335 21.9334Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
          <FormMessage>
            {translationError && (
              <span className="text-destructive-foreground">
                {translationError.message}
              </span>
            )}
          </FormMessage>
        </FormItem>
        <div className="mt-0 flex flex-col flex-wrap gap-3 pt-8 md:flex-row md:items-center md:justify-between">
          <SubmissionState
            hasSubmittedTranslation={hasSubmittedTranslation}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
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
  isSubmitted,
}) => {
  if (isSubmitted) {
    return (
      <>
        <Button className="bg-[#80D0CF]">
          <span className="mr-2">Translation suggested</span>{' '}
          <CheckDecagramGreen />
        </Button>
        {children}
      </>
    )
  }

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
