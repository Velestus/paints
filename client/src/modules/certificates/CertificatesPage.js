import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Avatar, Icon, List } from 'antd';

import { VPageTitle, VPageWrapper } from 'components';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class CertificatesPageClass extends React.Component {
	render() {
		const listData = [];
		for (let i = 0; i < 23; i++) {
			listData.push({
				href: 'http://ant.design',
				title: `ant design part ${i}`,
				avatar:
					'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				description:
					'Ant Design, a design language for background applications, is refined by Ant UED Team.',
				content:
					'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
			});
		}
		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);
		return (
			<VPageWrapper className="CertificatesPage">
				<VPageTitle size="large">Certyfikaty i kursy</VPageTitle>
				<div className="CertificatesPage-Wrapper">
					<List
						itemLayout="vertical"
						size="small"
						pagination={{ pageSize: 10 }}
						dataSource={listData}
						className="CertificatesPage-Content"
						renderItem={item => (
							<List.Item
								key={item.title}
								actions={[
									<IconText type="star-o" text="156" />,
									<IconText type="like-o" text="156" />,
									<IconText type="message" text="2" />
								]}
								extra={
									<img
										width={272}
										alt="logo"
										src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
									/>
								}
							>
								<List.Item.Meta
									avatar={<Avatar src={item.avatar} />}
									title={<a href={item.href}>{item.title}</a>}
									description={item.description}
								/>
								{item.content}
							</List.Item>
						)}
					/>
				</div>
			</VPageWrapper>
		);
	}
}

const CertificatesPage = withRouter(
	connect(mapStateToProps)(CertificatesPageClass)
);
export default CertificatesPage;
