export default function html([first, ...strings], ...value) {
    return value
      .reduce(
        function (acc, cur) {
          // console.log("first:", first);
          // console.log("strings:", strings);
          // console.log("value: ", value);
          // console.log("curr:", cur);
          // console.log("acc:", acc);
          return acc.concat(cur, strings.shift());
        },
        [first]
      )
      .filter((x) => (x && x !== true) || x === 0)
      .join("");
  }
  
  export function createStore(reducer) {
    let state = reducer();
    const roots = new Map();
    function render() {
      for (const [root, component] of roots) {
        const output = component();
        root.innerHTML = output;
      }
    }
    return {
      attach(component, root) {
        roots.set(root, component);
        render();
      },
      connect(selector = (state) => state) {
        return (component) => (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args));
      },
      dispatch(action, ...args) {
        state = reducer(state, action, args);
        render();
      }
    };
  }
  