# 14장 외부 API를 연동하여 뉴스 뷰어 만들기

지금까지 배운 것을 활용하여 카테고리별로 최신 뉴스 목록을 보여 주는 뉴스 뷰어 프로젝트를 진행한다.<br />
API : https://newsapi.org/

## 14.1 비동기 작업의 이해

- 서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 오래 걸릴 수 있다.
- 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리하기 때문이다.

#### 동기적 작업 처리

요청이 끝날 때까지 기다리는 동안 다른 작업은 중지 상태가 되어 작업을 할 수 없음.

#### 비동기적 작업 처리

동시에 여러 가지 요청을 처리할 수도 있고, 기다리는 과정에서 다른 함수도 호출 가능.<br />
비동기 작업 예시 `setTimeout`

```javascript
function printMe() {
  console.log("Hello world");
}
setTimeout(printMe, 3000);
console.log("대기 중...");
```

setTimeout이 사용되는 시점에서 코드가 3초동안 멈추는게 아니라, 모든 코드가 호출되고 3초 뒤에 지정해 준 printMe가 호출된다.<br />
setTimeout의 인자로 전달된 printMe 함수를 **콜백 함수** 라 한다.

### 14.1.1 콜백 함수

- `callbackExample.js` 코드는 `increase` 함수에 0과 result 라는 `callback` 함수를 전달하고 있다.
- setTimeout 내부에서 0에 10을 더하는 작업을 처리한 뒤 callback 함수를 호출해서 increase에 있는 console.log가 실행 되는 것이다.
- callback 함수를 중첩하여 구현하면 여러 번 호출할 수 있지만 가독성이 떨어지므로 지양해야 할 형태이다. 이를 콜백 지옥이라 한다.

### 14.1.2 Promise

- Promise는 콜백 지옥 같은 코드가 형성되지 않게 하는 방안이다.
- `.then`을 통해 그 다음 작업을 설정한다.

### 14.1.3 async/await

- `async/await`는 `Promise`를 더욱 쉽게 사용할 수 있도록 해 주는 ES2017(ES8) 문법.
- 함수의 앞부분에 `async` 키워드를 추가.
- 함수 내부에서 Promise의 앞부분에 `await` 키워드를 추가.
- 이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

## 14.2 axios로 API 호출해서 데이터 받아 오기

- axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트.
- HTTP 요청을 Promise 기반으로 처리한다.

```bash
yarn add axios
```

- onClick 함수에 `axios.get` 함수를 사용했다. 이 함수는 파라미터로 전달된 주소에 GET 요청을 해 준다. 이에 대한 결과는 `.then`을 통해 비동기적으로 확인이 가능하다.
- 화살표 함수에 async/await를 적용할 때는 `async () => {}` 와 같은 형식으로 적용한다.

## 14.3 newsapi API 키 발급받기

- 최신 뉴스를 불러온 후 보여 줄 것.
- https://newsapi.org/register 에서 가입하면 발급 가능.
- https://newsapi.org/s/south-korea-news-api 에서 한국 뉴스를 가져오는 API에 대한 설명서가 있다.
- 전체 뉴스를 불러오는 API로 대체한다.

## 14.4 뉴스 뷰어 UI 만들기

- styled-components를 사용해서 뉴스 정보를 보여 줄 컴포넌트를 만든다.

```
yarn add styled-components
```

#### NewsItem.js 와 NewsList.js

- NewsItem은 각 뉴스 정보를 보여 주는 컴포넌트.
- NewsList는 API를 요청하고 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트.

### 14.4.1 NewsItem 만들기

뉴스 데이터 중 아래의 필드를 리액트 컴포넌트로 나타낸다.

- title: 제목
- description: 내용
- url: 링크
- urlToImage: 뉴스 이미지

NewsItem 컴포넌트는 article 이라는 객체를 props로 통째로 받아 와서 사용한다.<br />

### 14.4.2 NewsList 만들기

- 더미 데이터를 NewsItem에 전달.
- styled를 적용한다.

## 14.5 데이터 연동하기

실제 API를 호출 해 본다. <br />

- useEffect 를 사용해서 컴포넌트가 처음 렌더링되는 시점에 API를 호출한다.
- useEffect는 리액트 컴포넌트가 **랜더링되고 난 직후마다 특정 작업을 수행하도록 설정할 수 있는 Hook**이다.
- 만약 컴포넌트가 **화면에 맨 처음 렌더링될 때만 실행하고, 업데이트 될 때는 실행하지 않으려면** 함수의 두 번째 파라미터로 **비어 있는 배열**을 넣어 주면 된다.
- 주의할 점은 useEffect에 등록하는 함수에 async를 붙이면 안된다. useEffect에서 반환하는 값은 뒷정리 함수이기 때문이다.
- async/await를 사용하고 싶다면 함수 내부에 async 키워드가 붙은 또다른 함수를 만들어서 사용해야 한다.
- loading이라는 상태를 이용해 API 요청이 대기 중인이 판별한다.
- map 함수를 사용하여 컴포넌트 배열로 변환할 때 `!articles`를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다. 데이터가 없으면 map 함수가 없기 때문에 렌더링 과정에서 오류가 난다.

## 14.6 카테고리 기능 구현하기

총 6개의 카테고리가 있다.

- business
- science
- entertainment
- sports
- health
- technology

### 14.6.1 카테고리 선택 UI 만들기

- Categories.js 컴포넌트를 만든다.
- name은 실제 카테고리 값, text는 렌더링할 때 사용할 한글 카테고리를 가리킨다.
- App.js 에서 category의 상태를 useState로 관리한다.
- category의 값을 업데이트 하는 함수인 onSelect 함수도 만든다.
- 이를 Categories 컴포넌트에 props로 전달한다. 또한 category 값을 NewsList 컴포넌트에도 전달한다.
- 선택된 category에 따라 글씨의 style이 달라진다.
