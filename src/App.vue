<template>
  <div id="app" class="h-full w-full">
    <div v-if="choosencategory == 0" class="flex flex-column justify-center items-center h-full w-full"><h1 class="mt-6 mb-6"> Wybierz swojego przeciwnika:</h1>

    <div class="container grid grid-cols-2 h-full w-full gap-3">

      <button class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-3 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      v-for="item in categories" :key="item.id" v-bind:id="item.id"  @click="choosecat($event)"> {{item.name}} </button>

      <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      @click="randomize()"
      >
        Jestem gotowy na prawdziwego przeciwnika
      </button>

    </div>
    </div>


    <div v-if="choosencategory == 1" class="container flex flex-col h-full justify-center items-center w-full">
      <div v-if="summaryscreenshown == 0" class="bg-white p-12 rounded-lg shadow-lg w-full mt-8 pt-2">
        <h1 class="font-bold text-4xl text-center text-purple-800"> Very important test na odlewnika!!!!</h1>

        <div v-if="notrandom == 1">
        <h1 class="font-bold text-4xl text-center text-purple-800"> <img v-bind:src="questions[index]['question']"/> </h1>
      <label  v-for="(answer,key) in questions[index, indexmax]['answers']" v-bind:key="answer"
             class="block text-xl w-full mt-4 border border-gray-400 rounded-lg py-3 px-6 text-lg-start hover:bg-indigo-100 cursor-pointer" :class="{allgood: allgood,  somethingbad: somethingbad}">
      <input type="checkbox" v-bind:id="key" v-bind:value="key" class="checked:bg-blue-500 mr-3" v-model="selectedAnswers" />
        {{key }}.{{ answer }}
      </label>
      <div class="mt-4" v-if="show_ans == 1"> <p class="text-lx text-green-500"> Dobre odpowiedzi to: {{questions[index]['correctAnswers']}} </p></div>
        </div>
        <div v-else>
          <h1 class="font-bold text-4xl text-center text-purple-800"> <img v-bind:src="questions[randomquestionnumber]['question']"/> </h1>
          <label  v-for="(answer,key) in questions[randomquestionnumber]['answers']" v-bind:key="answer"
                  class="block text-xl w-full mt-4 border border-gray-400 rounded-lg py-3 px-6 text-lg-start hover:bg-indigo-100 cursor-pointer" :class="{allgood: allgood,  somethingbad: somethingbad}">
            <input type="checkbox" v-bind:id="key" v-bind:value="key" class="checked:bg-blue-500 mr-3" v-model="selectedAnswers" />
            {{key }}.{{ answer }}
          </label>
          <div class="mt-4" v-if="show_ans == 1"> <p class="text-lx text-green-500"> Dobre odpowiedzi to: {{questions[randomquestionnumber]['correctAnswers']}} </p></div>
        </div>


        <div class="w-full flex justify-end gap-10">
          <button class="bg-indigo-50 text-purple-800 text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="showcheck == 1" @click=checkanswer($event)>Sprawdź</button>
          <button id="next_question" class="bg-indigo-900 text-white text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="hiddenbutton == 1" @click=nextquestion($event)>Następne</button>
          <button id="showsummary" class="bg-rose-500 text-white-800 text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="showsummary == 1" @click=showsummaryscreen()>Zobacz wyniki</button>
        </div>
      </div>

      <div v-if="summaryscreenshown == 1" class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
        <div v-if="notrandom == 1">
        <h1> Twój wynik to:</h1>
        <p> {{points}} / {{indexmax-  pointsstart}}</p>
          </div>
        <div v-else>
          <h1> Twój wynik to:</h1>
          <p> {{points}} / 40</p>
          <p class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" v-if="40/this.points<=2">🎉🎉🎉 Zdaned!!!!!! 🎉🎉🎉</p>
          <p class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" v-else>😿😿😿 Niezdaned, weź się w garść pociesz kotka i zdaj następne oki? :( 😿😿😿</p>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      index: 0,
      usethis: 0,
      pointsstart: 0,
      indexmax: 0,
      indexrandom: 0,
      randomquestionnumber: 0,
      choosencategory: 0,
      hiddenbutton: 0,
      showsummary: 0,
      points: 0,
      summaryscreenshown: 0,
      showcheck: 1,
      notrandom: 1,
      allgood: false,
      somethingbad: false,
      show_ans: 0,
      selectedAnswers: [],
      questions: [
        {
          question: '1.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '2.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '3.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '4.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a']
        },
        {
          question: '5.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '6.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '7.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '8.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a']
        },
        {
          question: '9.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a']
        },
        {
          question: '10.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a']
        },
        {
          question: '11.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '12.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '13.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '14.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '15.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '16.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '17.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['b']
        },
        {
          question: '18.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '19.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '20.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '21.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '22.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '23.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '24.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '25.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '26.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '27.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '28.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '29.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '30.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '31.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '32.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '33.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '34.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '35.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '36.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '37.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '38.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '39.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '40.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '41.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '42.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '43.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '44.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '45.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '46.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '47.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '48.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '49.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '50.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '51.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '52.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '53.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '54.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '55.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '56.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '57.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '58.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '59.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '60.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '61.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '62.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '63.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '64.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '65.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '66.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '67.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '68.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '69.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '70.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },{
          question: '71.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '72.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '73.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '74.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '75.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '76.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','d']
        },
        {
          question: '77.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','c']
        },
        {
          question: '78.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '79.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '80.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '81.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','a']
        },
        {
          question: '82.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '83.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '84.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '85.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '86.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','d']
        },
        {
          question: '87.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '88.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a','b']
        },
        {
          question: '89.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a','b']
        },
        {
          question: '90.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '91.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '92.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '93.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '94.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '95.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '96.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '97.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '98.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '99.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '100.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '101.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','d']
        },
        {
          question: '102.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '103.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '104.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '105.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '106.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '107.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','d']
        },
        {
          question: '108.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '109.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '110.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '111.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '112.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '113.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '114.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '115.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '116.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '117.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '118.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '119.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '120.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '121.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '122.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '123.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','c','d']
        },
        {
          question: '124.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '125.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '126.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '127.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '128.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '129.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '130.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','c','d']
        },
        {
          question: '131.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '132.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '133.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '134.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c','d']
        },
        {
          question: '135.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '136.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','c','d']
        },
        {
          question: '137.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '138.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '139.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '140.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c','d']
        },
        {
          question: '141.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['c']
        },
        {
          question: '142.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a']
        },
        {
          question: '143.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '144.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c','d']
        },
        {
          question: '145.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','d']
        },
        {
          question: '146.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '147.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '148.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '149.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '150.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '151.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '152.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '153.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '154.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '155.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '156.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        },
        {
          question: '157.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c']
        },
        {
          question: '158.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '159.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C"},
          correctAnswers: ['a','b','c']
        },
        {
          question: '160.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b','d','c']
        },
        {
          question: '161.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c']
        },
        {
          question: '162.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['c','a']
        },
        {
          question: '163.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d','b']
        },
        {
          question: '164.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','d']
        },
        {
          question: '165.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '166.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '167.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '168.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b']
        },
        {
          question: '169.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c','d']
        },
        {
          question: '170.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a']
        },
        {
          question: '171.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['b']
        },
        {
          question: '172.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','c','d']
        },
        {
          question: '173.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
        }
      ],
      categories: [
        {
          id: 0,
          name: 'Matematyka',
          numbers: [0,17]
        },
        {
          id: 1,
          name: 'Chemia',
          numbers: [18,37]
        },
        {
          id: 2,
          name: 'Materiały na formy odlewnicze',
          numbers: [38,49]
        },
        {
          id: 3,
          name: 'Krystalizacja',
          numbers: [50,52]
        },
        {
          id: 4,
          name: 'Metody odchyłek ważonych',
          numbers: [53,64]
        },
        {
          id: 5,
          name: 'CAD',
          numbers: [65,85]
        },
        {
          id: 6,
          name: 'BHP',
          numbers: [86,92]
        },
        {
          id: 7,
          name: 'Mechanika płynow',
          numbers: [93,106]
        },
        {
          id: 8,
          name: 'Symulacje komputerowe procesów wytwarzania',
          numbers: [107,118]
        },
        {
          id: 9,
          name: 'Fizykochemia',
          numbers: [119,128]
        },
        {
          id: 10,
          name: 'Technologia Form Odlewniczych',
          numbers: [129,145]
        },
        {
          id: 11,
          name: 'Grafika Inżynierska',
          numbers: [146,157]
        },
        {
          id: 12,
          name: 'Częsci maszyn',
          numbers: [158,172]
        }
      ]
    }
  },
  methods: {
    checkanswer()
    {
      console.log(this.questions.length)

      if( this.notrandom==1){
      if( this.selectedAnswers.sort().join() === this.questions[this.index]['correctAnswers'].sort().join() ) {
      this.points++
      this.allgood = true;
      this.somethingbad = false;
      }
      else {
        console.log('nie!')
        this.allgood = false;
        this.somethingbad = true;
      }

      if(this.index === this.indexmax-1) {
        this.showcheck = 1
        this.hiddenbutton = 0
        this.showsummary = 1
      } else {
        this.hiddenbutton = 1
      }
      } else {
        if (this.selectedAnswers.sort().join() === this.questions[this.randomquestionnumber]['correctAnswers'].sort().join()) {
          this.points++
          this.allgood = true;
          this.somethingbad = false;
        } else {
          console.log('nie!')
          this.allgood = false;
          this.somethingbad = true;
        }

        if (this.index === 39) {
          this.showcheck = 1
          this.hiddenbutton = 0
          this.showsummary = 1
        } else {
          this.hiddenbutton = 1
        }
      }

      this.show_ans = 1
      this.showcheck = 0
    },
    nextquestion()
    {
      this.indexrandom++
      this.index++
      this.selectedAnswers= []
      this.allgood = false;
      this.somethingbad = false;
      this.show_ans = 0
      if(this.index === this.indexmax-1) {
        this.hiddenbutton = 0
        this.showsummary = 1
      }
      else {
        this.showcheck = 1
        this.hiddenbutton = 0
      }
      this.randomquestionnumber = this.usethis[this.index][0]
    },
    showsummaryscreen()
    {
      if( this.selectedAnswers.sort().join() === this.questions[this.index]['correctAnswers'].sort().join() ) {
        this.points++
      }
      this.summaryscreenshown = 1
    },
  randomize(){
    this.randomquestionnumber++
    this.notrandom = 0
    this.choosencategory = 1
    let number_of_items = 40
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173]
    let result = []
    let maxitems = 173
    for (let i=0; i<number_of_items; i++){
      let min = Math.ceil(0);
      let max = Math.floor(maxitems);
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      let chosennumber = numbers.splice(number, 1)
      maxitems--
      result.push(chosennumber)
    }
    this.usethis = result

    this.randomquestionnumber = this.usethis[0][0]

  },
    choosecat: function(event)
    {
      this.notrandom = 1
      console.log(event.currentTarget.id)
     this.index = this.categories[event.currentTarget.id]['numbers'][0]
      this.indexmax = this.categories[event.currentTarget.id]['numbers'][1]
      this.pointsstart = this.categories[event.currentTarget.id]['numbers'][0]
      this.choosencategory = 1
    }
  }
}
</script>

