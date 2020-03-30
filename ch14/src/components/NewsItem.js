import React from "react";
import styled from "styled-components";

const NewsItemBlock = styled.div`
  display: flex; /* img와 contents 영역을 수평 구조로 분리*/
  .thumbnail {
    margin-right: 1rem; /* img의 오른쪽 margin영역의 1rem만큼 띄움 */
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover; /* 내용이 종횡비를 유지하면서 정의된 너비와 높이를 가득 채울때까지 확대 */
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
