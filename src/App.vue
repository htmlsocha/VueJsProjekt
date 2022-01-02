<template>
  <div id="app">
    <div class="container flex flex-col h-full justify-center items-center  w-full max-w-xl">


      <div v-if="summaryscreenshown == 0" class="bg-white p-12 rounded-lg shadow-lg w-full mt-8 pt-2">
        <h1 class="font-bold text-4xl text-center text-purple-800"> Very important test na odlewnika!!!!</h1>
        <h1 class="font-bold text-4xl text-center text-purple-800"> <img v-bind:src="questions[index]['question']"/> </h1>
      <label v-for="(answer,key) in questions[0]['answers']" v-bind:key="answer"
             class="block text-xl w-full mt-4 border border-gray-400 rounded-lg py-3 px-6 text-lg-start hover:bg-indigo-100 cursor-pointer" :class="{allgood: allgood,  somethingbad: somethingbad}">
      <input type="checkbox" v-bind:id="key" v-bind:value="key" class="checked:bg-blue-500 mr-3" v-model="selectedAnswers" />
        {{key }}.{{ answer }}
      </label>
      <div class="mt-4" v-if="show_ans == 1"> <p class="text-lx text-green-500"> Dobre odpowiedzi to: {{questions[index]['correctAnswers']}} </p></div>


        <div class="w-full flex justify-end gap-10">
          <button class="bg-indigo-50 text-purple-800 text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="showcheck == 1" @click=checkanswer($event)>Sprawdź</button>
          <button id="next_question" class="bg-indigo-900 text-white text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="hiddenbutton == 1" @click=nextquestion($event)>Następne</button>
          <button id="showsummary" class="bg-rose-500 text-white-800 text-3xl rounded-lg border border-gray-600 mt-4 px-6 py-2" v-if="showsummary == 1" @click=showsummaryscreen()>Zobacz wyniki</button>
        </div>
      </div>

      <div v-if="summaryscreenshown == 1" class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
        <h1> Twój wynik to:</h1>
        <p> {{points}} / {{questions.length}}</p>
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
      hiddenbutton: 0,
      showsummary: 0,
      points: 0,
      summaryscreenshown: 0,
      showcheck: 1,
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
          correctAnswers: ['a']
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
          correctAnswers: ['']
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
          correctAnswers: []
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
          correctAnswers: []
        },
        {
          question: '70.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: []
        },{
          question: '71.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: []
        },
        {
          question: '72.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['a','b','c','d']
        },
        {
          question: '73.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
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
          correctAnswers: ['']
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
          correctAnswers: ['a','b']
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
          correctAnswers: ['A']
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
          correctAnswers: ['']
        },
        {
          question: '131.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '132.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '133.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '134.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '135.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '136.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '137.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '138.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '139.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '140.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '141.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '142.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '143.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '144.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '145.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
        },
        {
          question: '146.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['']
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
          correctAnswers: ['c']
        },
        {
          question: '157.JPG',
          answers: {a: "Odpowiedź A", b: "Odpowiedź B", c: "Odpowiedź C", d: "Odpowiedź D"},
          correctAnswers: ['d']
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
          correctAnswers: ['c','d']
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
          correctAnswers: ['a']
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
      ]
    }
  },
  methods: {
    checkanswer()
    {
      console.log(this.questions.length)

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

      if(this.index === this.questions.length-1) {
        this.showcheck = 1
        this.hiddenbutton = 0
        this.showsummary = 1
      } else {
        this.hiddenbutton = 1
      }

      this.show_ans = 1
      this.showcheck = 0
    },
    nextquestion()
    {
      this.index++
      this.selectedAnswers= []
      this.allgood = false;
      this.somethingbad = false;
      this.show_ans = 0
      if(this.index === this.questions.length-1) {
        this.hiddenbutton = 0
        this.showsummary = 1
      }
      else {
        this.showcheck = 1
        this.hiddenbutton = 0
      }
    },
    showsummaryscreen()
    {
      this.summaryscreenshown = 1
    }
  }
}
</script>

