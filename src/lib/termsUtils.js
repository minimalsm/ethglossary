import examples from '@/data/examples.json'

export function getTermExamples(term) {
  const lowerCaseTerm = term.toLowerCase()

  // Todo: add a test to ensure we only use lowercase examples on examples JSON
  if (examples.hasOwnProperty(lowerCaseTerm)) {
    return examples[lowerCaseTerm]
  } else {
    return []
  }
}

// export function getTermExamples(term) {
//   const lowerCaseTerm = term.toLowerCase()

//   const examplesLowerCase = Object.keys(examples).reduce((acc, key) => {
//     acc[key.toLowerCase()] = examples[key]
//     return acc
//   }, {})

//   if (examplesLowerCase.hasOwnProperty(lowerCaseTerm)) {
//     return examplesLowerCase[lowerCaseTerm]
//   } else {
//     return []
//   }
// }
