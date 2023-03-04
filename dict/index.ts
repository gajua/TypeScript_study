type Words = {
  [key: string]: string; //아무 이름을 가진 key를 사용하는 object인데, string을 가진다.
}; //타입을 만드는 방법

class Dict {
  private words: Words; //이런식으로 내가 property를 만들고 원하는대로 초기화를 해주면 된다.
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    //클래스를 타입처럼 쓸 수 있다.
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
  //첼린지 : 여기에 단어를 삭제하고 단어를 업데이트하는 메소드를 만들기
}

class Word {
  constructor(public term: string, public def: string) {}
  //챌린지: 단어의 정의를 추가하거나 수정하는 메소드, 그리고 단어를 출력하는 메소드같은걸 만들기.
}
// 그냥 클래스랑 메소드, 그리고 private이나 public같은 것들을 사용해서 뭔가를 만들기.

const kimchi = new Word('kimchi', '한국의 음식');

const dict = new Dict();

dict.add(kimchi);
dict.def('kimchi');
