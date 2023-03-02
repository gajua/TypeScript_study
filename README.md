# 타입스크립트 

타입스크립트 코드 테스트
https://www.typescriptlang.org/play

타입스크립트 핸드북
https://typescript-kr.github.io/pages/basic-types.html
-------------
1.3 -> 생산성을 높이고 버그를 줄이기 위해, 타입 안정성이 높기때문에 타스를 사용한다.
1.5-> 왜 타스가 만들어졌는가? ->안정성 때문. 정확히는 타입안정성. 그래서 코드에 버그가 줄어든다, 런타임에러도 줄고 생산성도 는다. 이것이 타스가주는 가장 큰 장점.

-------------
2.0: 런타임에러를 보기싫어! 그래서 런타임 이전에 에러를 확인하자. 타스는 (강타입)언어. Node.js는 타스, 자스 모두 이해할 수 있지만 브라우저는 자바스크립트만을 이해한다. 타스는 개발자가 실수하는것을 방지해준다.
그렇다면 타스가 그저 자스로 변환해줄 뿐이라면 어떻게 도와줄까? 타스가 제공하는 보호장치는 자스코드로 변환하기 전에 작동한다.
 --> "타입스크립트가 에러가 발생할 것 같은 코드를 감지하면 자바스크립트로 컴파일되질 않는다." 
 그 뜻은 데이터 타입에 문제가 없다는 뜻. 자스 코드에 버그가 전혀 없다는 뜻!

댓글 - 타입스크립트란?
1.TypeScript는 JavaScript에 추가적인 구문을 추가하여 editor와의 단단한 통합을 지원합니다. editor에서 초기에 오류를 잡을 수 있습니다.

2. TypeScript 코드는 JavaScript가 실행되는 모든 곳(브라우저, Node.js 또는 Deno 및 앱 등)에서 JavaScript로 변환될 수 있습니다.

3. TypeScript는 JavaScript를 이해하고 타입 추론(type inference)을 사용하여 추가 코드 없이도 훌륭한 도구를 제공합니다.


-----
2.3 Tuple은 배열을 생성하는데 최소한의 길이를 가져야하고 특정위치에 특정 타입이 있어야함.
any는 아무타입. 타스로부터 보호장치가 사라진다. -> 그래서 사용을 자주하지 않는다.
readonly 속성은 값을 변경하지 못하게 막는다.

2.4 
댓글
void
void는 값을 반환하지 않는 함수의 반환 값을 나타냅니다. 함수에 return 문이 없거나 해당 return 문에서 명시적 값을 반환하지 않을 때 항상 유추되는 타입입니다.
```ts
 The inferred return type is void
function noop() {
return;
}
```
unknown
unknown타입은 모든 값을 나타냅니다. 이것은 any타입과 비슷하지만 any보다 unknown이 더 안전합니다. 이유는 unknown값으로 작업을 수행하는 것은 합법적이지 않기 때문입니다.
```ts
function hello(a: any) {
a.b(); // OK
}

function hello2(a: unknown) {
a.b(); // 에러: Object is of type 'unknown'.
}
```
never
일부 함수는 값을 반환하지 않습니다.
이는 함수가 예외를 throw하거나 프로그램 실행을 종료함을 의미합니다.
```ts
function fail(msg: string): never {
throw new Error(msg);
}
```
https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

-----------

3.0 함수
call signature => 우리가 타입스크립트에게 이 함수가 어떻게 호출되는지 설명해주는 부분. 파라미터의 타입은 무엇인지, 그리고 함수의 리턴 타입은 무엇인지.
함수의 call signature 타입을 만드는 방법
type Add = (a: number, b: number) => number;

const add:Add = (a, b) => a+ b
5:26 에서 {}를 사용했을 때 오류가 발생하는 이유가 기억이 안 나서 다시 찾아봤습니다.

결론부터 말씀드리자면 {}를 사용하면 그 값이 반환값이 함수 내부의 내용으로 처리가 됩니다.

밑의 예시를 보면 이해가 되실거라 생각됩니다.

1.
``` ts
const add:Add = (a,b) => a+b 를 함수로 풀면 다음과 같게 됩니다.
function add(a, b) {
return (a+b)
}
```

2. 
```ts
const add:Add = (a,b) => {a+b} 를 함수로 풀면 다음과 같게 됩니다.
function add(a, b) {
a+b;
}
```
즉 애로우함수에서 {}를 사용하게 되면 그 안의 값은 반환이 아니라 함수 내부 내용으로 처리되기에 반환값이 없는 void로 처리됩니다. 이에 따라 위에서 미리 선안한 Add자료형의 반환값은 number라고정해놓은 내용과 충돌하기에 에러가 발생합니다.

3.1
overloading(오버로딩)
오버로딩은 함수가 서로다른 여러개의 call signature를 가지고 있을 때 발생시킨다.
type이 any뜨시는 분들은

npm install -g typescript 입력후
tsc --init 입력해보시고 다시 시도해보세요

3.2 다형성 (polymorphism)
## ❓poly란?
- many, serveral, much, multi 등과 같은 뜻
## ❓morphos란?
- form, structure 등과 같은 뜻
## ❗polymorphos = poly + morphos = 여러 다른 구조

concrete type
- number, boolean, void 등 지금까지 배운 타입

generic type
- 타입의 placeholder

## 제네릭을 사용하는 이유 : call signature를 작성할 때, 확실한 타입을 모를 때 generic을 사용한다.(concrete type이 되겠지만, 그 타입을 미리 알 수 없다.)
* 제네릭은 기본적으로 placeholder를 사용해서 내가 작성한 코드의 타입 기준으로 바꿔준다.

3.3

타스는 제네릭이 처음 사용되는 지점을 기반으로 이 타입이 무엇인지 알게 된다.


제네릭은 C#이나 Java와 같은 언어에서 재사용 가능한 컴포넌트를 만들기 위해 사용하는 기법입니다. 단일 타입이 아닌 다양한 타입에서 작동할 수 있는 컴포넌트를 생성할 수 있습니다.


3.4
댓글 :강의 보면서 느낌은 알았지만 제네릭 개념을 한마디로 설명하는 게 힘들었는데 인터넷에서 본 설명이 인상 깊어서 옮겨봅니다.

## '제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.'


4.0 객체지향
TypeScirpt 에는 java처럼 객체지향 프로그래밍을 할 때 private나 public을 사용할 수 있다.
TypeScript와 객체지향 프로그램이 가지고 있는 엄청 훌륭한 것은 추상클래스(Abstrack Class)다. 

```ts
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    public naickname: string
  ) {}
}

class Player extends User {
  
}

const sewon = new Player("sewon", "kim", "king");

sewon.naickname;

```
추상클래스는 다른 클래스가 상속받을 수 있는 클래스다.
하지만 이 클래스는 직접 새로운 인스턴스를 만들 수 없다.

예를 들어 위에 코드에서 User라는 클래스를 만들었으나,
``ts
const sewon = new User("sewon", "kim", "king")
```
은 불가능하다.
TypeScript가 추상클래스의 인스턴스를 만들 수 없다고 경고한다. 다시말하면, 추상클래스는 오직 다른 곳에서 상속받을수만 있는 클래스다.

추상메소드는 추상클래스를 상속받는 모든 것들이 구현을 해야하는 메소드를 의미한다.

![image](https://user-images.githubusercontent.com/101968934/222347085-6b8464c0-f4c3-47ab-9fcb-03bd1aae7d93.png)









