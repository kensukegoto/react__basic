# props

コンポーネントへ値を渡す際に使用。
変更不可能な値（cf. state）

```js
// 使う側
const profiles = [
    {name: "Taro",age:10},
    {name: "Hanako",age:5},
];
return (
    <div>
    {
        profiles.map((profile,index) => {
            return <User name={profile.name} age={profile.age} key={index} />
        })
    }
    </div>
)

// Userコンポーネントの中身
const User = (proos) => {
    return <div>I am {props.name}</div>
}
```

# prop-types

propsの型チェックをする際に使用。

```js
import PropTypes from 'prop-types';

const User = (proos) => {
    return <div>I am {props.name}</div>
}

// props.nameはstring型であることをチェックする
// props.ageはnumber型であり、かつ必須要素であることをチェックする
User.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired
}
```

# state

classコンポーネントで使用出来る。
constructor内で初期化する。setState()メソッドで更新をする。setState()を使う事で再描画がされる。

```js
class Counter extends Component {
    constructor(props){
        super(props)
        this.state = {count:0}
    }

    handlePlusButton(){
        this.setState({ count: this.state.count + 1 })
    }
    handleMinusButton(){
        this.setState({ count: this.state.count ー 1 })
    }
    render(){
        return (
            <>
                <div>count: {this.state.count}</div>
                <button onClick={this.handlePlusButton}>+1</button>
                <button onClick={this.handleMinusButton}>-1</button>
            </>
        )
    }
}
```

# Reducer

stateのおおがかかりなもの。状態の保持と変更をする。<br>
カウンターを例にするとcountされた回数と増やしたり・減らしたりの変更をする。<br>
storeと言う仕組みと一緒に使うことで**子コンポーネントへバケツリレーで状態を渡すことを回避出来る。**<br>
（従来はpropsをバケツリレーしていたがそれを解消する仕組み。）

## combineReducer

例えばカウンターの状態と別にカウンターの操作ログの状態を管理したい場合を想定。このときカウンターの状態と操作ログのそれぞれのReducerを作ることになる。本来ならば別々のReducerを呼び出す必要があるが、１つにまとめて扱えるようにしてくれる。

```js
import {combineReducers} from 'redux'
import count from './count'
import actionLog from './actionLog'

export default combineReducers({ count,actionLog })
```

## store

最上位コンポーネントで`const store = createStore(reducer)`したstoreを子コンポーネントで使う。

```js
// App.js
import { connect } from 'react-redux'
import {
  increment,
  decrement,
} from '../actions'

~ 略 ~

const mapStateToProps = state => ({ value: state.count.value })
const mapDispatchToProps = dispatch => ({
  imcrement: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


// actions/index.js
~ 略 ~
export const increment = () => ({
    type: INCREMENT
})
~ 略 ~
```

この実装により状態管理をreducerに任せる事が可能となる。

```js
import { INCREMENT,DECREMENT } from '../actions'

const initialState = { value: 0 }

export default (state = initialState,action) => {

  switch(action.type){
    case INCREMENT:
      return {value: state.value + 1}
    case DECREMENT:
      return {value: state.value - 1}
    default:
      return state
  }
}
```