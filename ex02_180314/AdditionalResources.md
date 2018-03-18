# 수업보충자료


for문 과제에서, *innerHTML로 태그를 넣을 때* 사용한 `get(0)`에 관한 추가 설명드립니다.


jQuery 선택자로 값을 변수에 저장하고 console.log를 찍어보면, **jQuery Object 형태**로 저장됩니다.

![](https://github.com/yungvely/study/blob/master/ex02_180314/1.jpeg)<br/>
innerHTML로 컨텐츠를 추가하거나 변경하기 위해서는, **jQuery Object 가 아닌, DOM Element 형태**여야 사용할 수 있습니다.

![](https://github.com/yungvely/study/blob/master/ex02_180314/2.jpeg)<br/>

jQuery에서 `get()`은, **요소 중에서 해당하는 순번을 DOM Element 형태로 반환**합니다.

순번을 정할 필요가 없는 상태에서는, 0으로 표기해 줍니다.

ex) get(0), get(1)

(그럼 이쯤에서, get()과 eq()가 어떻게 다른지 궁금해 지겠죠? 테스트 해 보세요~!)


:peach: ** `eq()` ->  jQuery Object // `get()` ->  DOM Element  && *셀렉터* ->  jQuery Object // `셀렉터[0]` ->  DOM Element**

추가로 태그 삽입 방법 몇 가지를 공유드립니다. 과제하시면서 테스트 해 보세요 :D

![](https://github.com/yungvely/study/blob/master/ex02_180314/3.jpeg)<br/>

그리고, if문 과제에서 index 구문 정리는 다음을 참고해 주세요.

![](https://github.com/yungvely/study/blob/master/ex02_180314/4.jpeg)<br/>
