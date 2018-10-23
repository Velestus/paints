import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Carousel, List } from 'antd';

import { VPageTitle, VPageWrapper } from 'components';

class HomePageClass extends React.Component {
	render() {
		const data = [
			'Racing car sprays burning fuel into crowd.',
			'Japanese princess to wed commoner.',
			'Australian walks 100km after outback crash.',
			'Man charged over missing wedding girl.',
			'Los Angeles battles huge wildfires.'
		];
		return (
			<VPageWrapper>
				<VPageTitle size="large">Strona główna</VPageTitle>
				<div className="gc2c w100">
					<List
						header={<div className="fwb">Lista</div>}
						size="small"
						bordered
						dataSource={data}
						renderItem={item => <List.Item>{item}</List.Item>}
					/>
					<Carousel className="HomePage-carousel" autoplay>
						<div>
							<h3>1</h3>
						</div>
						<div>
							<h3>2</h3>
						</div>
						<div>
							<h3>3</h3>
						</div>
						<div>
							<h3>4</h3>
						</div>
					</Carousel>
				</div>
			</VPageWrapper>
		);
	}
}

const HomePage = withRouter(connect()(HomePageClass));
export default HomePage;
