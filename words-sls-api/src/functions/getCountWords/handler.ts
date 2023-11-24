// Importing necessary types and functions from external modules
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// Importing the schema for validation
import{ wordsDictionary, WordCategories, ResultCounts}  from './schema';
import schema  from './schema';

// Function to remove accents and convert to lowercase
function removeAccentsAndLowerCase(input: string): string {
  // Normalize the string to handle accented characters
  const normalizedString = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Convert to lowercase
  const lowercaseString = normalizedString.toLowerCase();

  return lowercaseString;
}

// Function to count words in the dictionary
function getCountsByCategory(dictionary: WordCategories, words: string[]): ResultCounts {
  const result : ResultCounts = {};
  for (const word of words) {
    for (const category in dictionary) {
      if (!result.hasOwnProperty(category)) {
        result[category] = 0;
      }
      const wordsInCategory: string[] = dictionary[category];
      for (const wordInCategory of wordsInCategory) {
        // Normalize and lowercase the dictionary word
        const normalizedWord: string = removeAccentsAndLowerCase(wordInCategory);

        // Create a regular expression for matching the start of the word
        const regex: RegExp = new RegExp(`^${normalizedWord}\w*`);

        // Check if the message word matches the dictionary word
        if (regex.test(removeAccentsAndLowerCase(word))) {
          // Increment the count for the corresponding category
          result[category]++;
        }
      }
    }
  }
  return result;
}

// Lambda function to count words in the request message
const countWordsHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // Splitting the message into an array of words
  const wordsArray: string[] = event.body.message.split(' ');

  // Counting words using the dictionary
  const response: ResultCounts = getCountsByCategory(wordsDictionary, wordsArray);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers':'*',
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({message:response})
  }
};

// Exporting the main lambda function using middy
export const main = middyfy(countWordsHandler);
