const mutations = {
	setsysUser:(state, payload) =>{
    state.sysUserId = payload.sysUserId;
    state.sysUserName = payload.sysUserName;
  }
}

export default mutations
