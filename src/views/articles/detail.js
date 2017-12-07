import React, {Component} from 'react';

// utils
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';

// style
import style from './detail.css';


class ArtcDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: {
        Id: null,
        Title: '',
        Subtitle: '',
        Content: '',
        Views: 0,
        Source: '',
        Publishtime: 0
      }
    };
  }

  componentDidMount() {
    const {Id} = this.props.location.state;
    request({
      url: api.article.detail,
      data: {Id},
      method: 'POST',
    }).then(res => {
      this.setState({detail: res});
    });
  }

  render() {
    const {Title, Subtitle, Content, Views, Source, Publishtime} = this.state.detail;
    return (
      <div className={style.detail}>
        <div className={style.title}>{Title}</div>
        <div className={style.subtitle}>{Subtitle}</div>
        <div className={style.content}>{Content}</div>
        <div className={style.info}>{`${Views} -- ${Source} -- ${Publishtime}`}</div>
      </div>
    );
  }
}

export default ArtcDetail;