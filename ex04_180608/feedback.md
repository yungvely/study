### 혜원 파트장님 feedback

Random index를 구할때, 같으면 계속 다시 계산이 아니고, 선택한 인덱스를 제외한 나머지에서 랜덤으로 선택하도록 하는것이 더 좋습니다 🍑



````javascript
randomIndex: function () {
    this.randomIdx = Math.floor(Math.random() * 3);
    if (this.listIndex === this.randomIdx) {
        // 랜덤 인덱스와 클릭한 인덱스가 같을때 다시 부름 다를때까지 
        this.randomIndex();
    } 
},
````



````javascript
randomIndex: function () {
    var listArray = [0,1,2],
    random= Math.floor(Math.random() * (listArray.length-1));
    //listArray.length-1 splice때문 (2개)
    listArray.splice(this.listIndex, 1);
    this.randomIdx = listArray[random];
},
````

 



