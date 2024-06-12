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
    console.log(result);
    setProduct(result.data.data);
  };

  useEffect(() => {
    getDataSearch();
  }, [messageInput]);

  return (
    <div>
      <div className="app-overall">
        <h1 className="header">เที่ยวไหนดี</h1>
        <div className="product-search">
          <div>ค้นหาที่เที่ยว</div>
          <div className="message-input">
            <label>
              <input
              className="input"
                id="message-text"
                name="message-text"
                type="text"
                placeholder="หาที่เที่ยวแล้วไปกัน"
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
                {item.photos.map((photo, i)=>{
                        return(i < 1 ? <img className="img-show" src={photo}></img> : null)
                    })}
                  
                </div>
                <div className="product-detail">
                  <div className="detail-header">{item.title}</div>
                  <p>{item.description}</p>
                  <a className="detail-next" href={item.url} target="_blank"><u>อ่านต่อ</u></a>
                  <div className="product-category">
                    <div>หมวด</div>
                    <div className="product-tags1">
                      {item.tags.map((tag, i) => {
                        return i < 4 ? <div><u>{tag}</u></div> : null;
                      })}
                    </div>
                    <div className="product-tags2"> และ 
                      {item.tags.map((tag, i) => {
                        return i < 1 ? <div><u>{tag}</u></div> : null;
                      })}
                    </div>
                  </div>
                  <div className="product-preview">
                    {item.photos.map((photo, i)=>{
                        return(i < 3 ? <img src={photo}></img> : null)
                    })}
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
