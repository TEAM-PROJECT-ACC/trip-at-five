export const TestPageLayout = ({ testTitle, testSubTitle, children }) => {
	return (
		<section className='test--page__section'>
			<h1>{testTitle}</h1>
			<h2>{testSubTitle}</h2>
			{children}
		</section>
	);
};
