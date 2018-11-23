____quizType____
choice

____quizBalls____
3

____quizQuestion____
Какого типа будет переменная func ?

____quizPicture____
https://d33wubrfki0l68.cloudfront.net/bfafcc3ea3a39fe3baae3a8d005f1c1076139b20/dbcc4/images/posts/reusable_transitions.jpg

____quizJS____

'use strict'

Function.prototype.say = function () {
	return {
	    func: this,
	    data: arguments
	}
}
function recursion ( n ) {
        if ( n < 1 ) return n
        var rec = recursion.say ( n )
        var с = rec.func
        var arg = --rec.data [0]
        return func ( arg )
}
recursion ( 5 )

____quizHTML____

<main id = 'scene'>
    <div class='permissions'>
        <input type='color'>
        <input type='number'>
    </div>
    <div class='permissions'>
        <input type='text'>
        <input type='file'>
        </div>
</main>


____choiceVariants____

объект,
массив,
строка,
null,
function,
undefined

____rightChoice____
2,4
