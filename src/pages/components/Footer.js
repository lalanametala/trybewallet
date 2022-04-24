import React from 'react';
import { RiGithubLine } from 'react-icons/ri';
import { TiSocialLinkedinCircular } from 'react-icons/ti';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="icons">
          <a
            href="https://github.com/lalanametala"
            target="_blank"
            rel="noreferrer"
          >
            <RiGithubLine className="sm-icons" />
          </a>
          <a
            href="https://www.linkedin.com/in/la%C3%ADs-nametala/"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialLinkedinCircular className="sm-icons" />
          </a>
        </div>
        <p>Desenvolvido por Laís Nametala</p>
      </footer>
    );
  }
}

export default Footer;
