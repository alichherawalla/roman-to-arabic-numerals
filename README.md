# roman-to-arabic-numerals
Convert roman numerals to arabic numerals

**Install dependencies**

`yarn`

**Run tests**

`yarn test`

**Run the server**

`yarn start` 

**Build docker image**

`docker build -t roman-to-arabic .`

**Run docker container**

`docker run -p 3000:3000 roman-to-arabic`

**Build and run docker container**

`bash docker-build-and-run.sh`


**cURL to convert roman to arabic numerals**

`curl -X GET 'http://localhost:3000/api/convert-to-arabic?roman=XXXI'`
