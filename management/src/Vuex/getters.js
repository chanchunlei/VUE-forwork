export default {
  changeName: state => {//显示侧边导航
    const nowPath = state.pathName;
    const str = nowPath.indexOf('default');
    const str2 = nowPath.indexOf('set');
    switch (true){
      case str>=0:
        state.name = 'default';
        break;
      case str2>=0:
        state.name = 'set';
        break;
    }
    return state.name;
  }
}
