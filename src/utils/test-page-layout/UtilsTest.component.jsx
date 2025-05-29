import { TestPageLayout } from '../../components/index.js';

export const UtilsTestPageLayout = ({ testSubTitle, children }) => {
	return (
		<TestPageLayout
			testTitle={'Utils-test'}
			testSubTitle={testSubTitle}>
			{children}
		</TestPageLayout>
	);
};
