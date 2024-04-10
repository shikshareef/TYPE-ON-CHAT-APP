import React from 'react'

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const LeftBar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
            <Conversations/>
            <LogoutButton/>
		</div>
	);
};
export default LeftBar;