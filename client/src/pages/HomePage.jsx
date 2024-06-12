import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [product, setProduct] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSearch = (event) => {
    setMessageInput(event.target.value);
  };

  const getDataSearch = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${messageInput}`
    );
    setProduct(result.data.data);
  };

  const handleTagClick = (tag) => {
    setMessageInput((sumText) => (sumText ? `${sumText} ${tag}` : tag))}

  useEffect(() => {
    getDataSearch();
  }, [messageInput]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      <div className="app-overall">
        <h1 className="header">เที่ยวไหนดี</h1>
        <div className="product-search">
          <div className="message-input">
            <div>ค้นหาที่เที่ยว</div> <br />
            <label>
              <input
                className="input"
                id="message-text"
                name="message-text"
                type="text"
                placeholder="...หาที่เที่ยวแล้วไปกัน..."
                value={messageInput}
                onChange={handleSearch}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="product-list">
          {product.map((item, index) => {
            return (
              <div className="product-result" key={index}>
                <div className="product-picture">
                  {item.photos.map((photo, i) => {
                    return i < 1 ? (
                      <img className="img-show" src={photo}></img>
                    ) : null;
                  })}
                </div>
                <div className="product-detail">
                  <div className="detail-header">{item.title}</div>
                  <p>{truncateText(item.description, 100)}</p>
                  <a className="detail-next" href={item.url} target="_blank">
                    <u>อ่านต่อ</u>
                  </a>
                  <div className="product-category">
                    <div>หมวด</div>
                    <div className="product-tags1">
                      {item.tags.map((tag, i) => {
                        return i < 4 ? (
                          <div
                            key={i}
                            className={"click-tag1"}
                            onClick={() => handleTagClick(tag)}
                          >
                            <u>{tag}</u>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="product-tags2">
                      {" "}
                      และ
                      {item.tags.map((tag, i) => {
                        return i < 1 ? (
                          <div
                            key={i}
                            className={"click-ta2g"}
                            onClick={() => handleTagClick(tag)}
                          >
                            <u>{tag}</u>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="photo-preview">
                    {item.photos.map((photo, i) => {
                      return i > 0 ? <img src={photo}></img> : null;
                    })}
                    <button
                      className="button-link"
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        alert("Link copied to clipboard!");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
