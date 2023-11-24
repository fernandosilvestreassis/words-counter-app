# words-counter-app

I chose to build the website with the Next.js framework because it is recommended in the React.js documentation for handling with TypeScript. Additionally, for building the API, I utilized TypeScript with AWS Lambda and deployed it using the Serverless Framework.

### Website 

> **Requirements**: TypeScript, NodeJS, NextJS, Axios 
>
>
```console
cd words-website
npm install
npm run dev -- --port 4000
```
http://words-website.s3-website-us-east-1.amazonaws.com

### API
> **Requirements**: TypeScript, Aws Lambda, Serverless Framework, Yarn(chip m1)
>
```console
cd words-sls-api
npm install -g serverless
brew install serverless (Macbook Chip M1)
yarn install
sls invoke local -f getCountWords --path src/functions/getCountWords/mock.json --printOutput
```
https://gqtqp9la97.execute-api.us-east-1.amazonaws.com/dev