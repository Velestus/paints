import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Icon } from 'antd';

import { VPageTitle, VPageWrapper } from 'components';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class ContactPageClass extends React.Component {
	render() {
		return (
			<VPageWrapper className="ContactPage">
				<VPageTitle size="large">Kontakt</VPageTitle>
				<div className="ContactPage-Wrapper">
					<div className="ContactPage-Content">
						Jakiś tekst zachęcający do kontaktu
						<div className="ContactPage-Contacts">
							<div className="ContactPage-Contact">
								<Icon type="phone" />
								<a href="tel://48123456789" rel="nofollow">
									(+48) 123-456-789
								</a>
							</div>
							<div className="ContactPage-Contact">
								<Icon type="mail" />
								<a href="mailto:nazwa@poczta.domena" rel="nofollow">
									nazwa@poczta.domena
								</a>
							</div>
						</div>
					</div>
				</div>
			</VPageWrapper>
		);
	}
}

const ContactPage = withRouter(connect(mapStateToProps)(ContactPageClass));
export default ContactPage;
