// import cookieCutter from 'cookie-cutter';
import Cookies from 'cookies';
import cookieCutter from 'cookie-cutter';

export default function logout(req, res) {
	const cookies = new Cookies(req, res);

	cookies.set("userToken", undefined);

	res.status(200).json({
		msg: 'success logout',
	});
	res.end();
}
