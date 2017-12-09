import React, {Component} from 'react';
import moment from 'moment';
import Markdown from 'react-markdown';

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
        Publishtime: 0,
        Poster: null
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
    const {Title, Subtitle, Content, Views, Source, Publishtime, Poster} = this.state.detail;
    var posterHeigth = (document.documentElement.clientHeight - 90 - 54) + 'px';
    return (
      <div className={style.detail}>
        <div className={style.poster}
          style={{backgroundImage: "url("+Poster+")", height: posterHeigth}}
        >
          <div className={style.mask}>
            <div className={style.titleWrapper}><div className={style.title}>{Title}</div></div>
          </div>
        </div>
        <div className={style.body}>
          <div className={style.subtitle}>{Subtitle}</div>
          <Markdown className="markdownBody" escapeHtml={true} source={Content} />
          <div className={style.info}>{`${Views} - ${Source} - ${moment(parseInt(Publishtime, 0)).format('MMMM Do YYYY')}`}</div>
        </div>
      </div>
    );
  }
}

export default ArtcDetail;