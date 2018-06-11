# 수업보충자료

Q. 객체내의 모든 속성들의 값을 배열에 저장한후, abc 순으로 sorting 하여, 'abcdefg' 문자열로 출력해보세요.

````html
<script>
var obj = {
   e : 'e',
   d : 'd',
   b : 'b',
   g : 'g',
   c : 'c',
   f : 'f',
   a : 'a'
};
var array = [];
for (var key in obj) {
    array.push(obj[key]);
}
var result = array.sort().join('');
console.log(result);
</script>
````

Q. 'bcaebe' 문자열을 hasOwnProperty 를 사용해서, {a : 1, b : 2, c : 1, e : 2} 로 변경해보세요.

````html
<script>
var txt = 'bcaebe',
    obj = {};
var array = txt.split('').sort();
for (var i = 0, max = array.length; i < max; i++) {
    if (!obj.hasOwnProperty(array[i])) {
        obj[array[i]] = 1;
    } else {
        obj[array[i]] += 1;
    }
}
console.log(obj);
</script>
````

Q. 배열에 본인 이름을 한글자씩 담은 다음 문자열로 출력하세요.

````html
<script>
var array = ['An', 'Hyewon'];
var result = array.join(' ');
console.log(result);
</script>
````

Q. 'question' 문자열을 거꾸로 출력하세요. (for문 사용)

````html
<script>
var txt = 'question',
    array = [];
for (var i = 0, max = txt.length; i < max; i++) {
    array.push(txt[i]);
}
var result = array.reverse().join('');
console.log(result);
</script>
````

Q. [40, 100, 1, 5, 25, 10] 에서 가장 큰 수 순서대로 index 를 배열로 출력하세요. (for/if문 사용)

````html
<script>
var array = [40, 100, 1, 5, 25, 10],
    cloneArray = array.slice(),
    newArray = [];
var sortArray = array.sort(function (a, b) {
    return b - a
});
for (var i = 0, max = array.length; i < max; i++) {
    newArray[i] = $.inArray(cloneArray[i], array);
}
console.log(newArray);
</script>
````

Q. 2중 배열로 구구단을 만드세요. (for문 사용)

````html
<script>
var array = [];
for (var i = 0, max = 10; i < max; i++) {
    array[i] = [];
    for (var j = 0, jmax = 9; j < jmax; j++) {
        array[i][j] = (i + 2) * (j + 1);
    }
}
console.log(array);
</script>
````

Q. 배열에 숫자 0 ~ 9까지 담아보세요. (for문 사용)

````html
<script>
var array = [];
for (var i = 0, max = 10; i < max; i++) {
    array.push(i);
}
console.log(array);
</script>
````

Q. 배열에 숫자 0 ~ 5 사이의 랜덤한 숫자를 6개 담아보세요. (for문 사용)

````html
<script>
var array = [];
for (var i = 0, max = 6; i < max; i++) {
    array[i] = Math.floor(Math.random() * max);
}
console.log(array);
</script>
````

Q. 배열에 숫자 0 ~ 9까지 담고, 버튼 클릭시 랜덤한 숫자를 하나씩 빼주세요.

````html
<script>
var obj = {
    init : function () {
        this.setElements();
        this.bindEvents();
        this.setArray();
        console.log(this.array);
    },
    setElements : function () {
        this.container = $('.exam_wrap').eq(6);
        this.btn = this.container.find('button');
    },
    bindEvents : function () {
        this.btn.on('click', $.proxy(this.onClickFunc, this));
    },
    setArray : function () {
        this.array = [];
        for (var i = 0, max = 10; i < max; i++) {
            this.array[i] = i;
        }
    },
    onClickFunc : function () {
        this.randomIndex = Math.floor(Math.random() * this.array.length);
        this.array.splice(this.randomIndex, 1);
        console.log(this.array);
    }
}
obj.init();
</script>
````

Q. 배열에 숫자 0 ~ 5 사이의 랜덤한 숫자를 중복되는 값이 없도록 6개 담아보세요. (for/if문 사용)

````html
<script>
var array = [];
for (var i = 0, max = 6; i < max; i++) {
    array[i] = Math.floor(Math.random() * max);
    for (var j = 0; j < i; j++) {
        if (array[i] === array[j]) {
            i--;
            continue;
        }
    }
}
console.log(array);
</script>
````