import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Card, message } from 'antd';

import { VPageTitle, VPageWrapper } from 'components';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class GalleryPageClass extends React.Component {
	render() {
		return (
			<VPageWrapper className="GalleryPage">
				<VPageTitle size="large">Galeria</VPageTitle>
				<div className="GalleryPage-Wrapper">
					<div className="GalleryPage-Content">
						<Card
							title="Tytuł"
							className="GalleryPage-Picture"
							hoverable
							type="inner"
							onClick={() => message.info('Kliknięto obrazek nr1')}
							cover={
								<img
									alt="example"
									src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
								/>
							}
						>
							Zawartość <br /> Zawartość <br /> Zawartość
						</Card>
						<Card
							title="Tytuł"
							className="GalleryPage-Picture"
							hoverable
							type="inner"
							onClick={() => message.info('Kliknięto obrazek nr2')}
							cover={
								<img
									alt="example"
									src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
								/>
							}
						>
							Zawartość <br /> Zawartość <br /> Zawartość
						</Card>
					</div>
				</div>
			</VPageWrapper>
		);
	}
}

const GalleryPage = withRouter(connect(mapStateToProps)(GalleryPageClass));
export default GalleryPage;
