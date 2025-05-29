// import LoginStateStore from "../login-store/loginStore";

	
//   const { id, pwd, setId, setPwd } = LoginStateStore();
  
  export const validateEmail = (id) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
	};

	// export const handleChange = ({e, setValue, setErrorValue}) => {
	// 	const value = e.target.value;
	// 	{setValue}(value);
	// 	if (!validateEmail(value)) {
	// 		{setErrorValue}('올바른 이메일 형식이 아닙니다.');
	// 	} else {
	// 		{setErrorValue}('');
	// 	}
	// };