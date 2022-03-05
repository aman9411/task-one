import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Menu = (props) => {

    const [picker, setPicker] = useState(false);

    const handlePicker = () => {
        setPicker(!picker);
    };

    const [toolTip, setTooltip] = useState(false);

    const [top_pos, setTop_pos] = useState(0);

    const [left_pos, setLeft_pos] = useState(0);

    const handleTooltip = (e) => {
        setTop_pos(e.clientY);
        setLeft_pos(e.clientX);
        setTooltip(!toolTip);
    }

    const inputTextColor = useRef(null);

    const setInputTextColor = (color) => {
        inputTextColor.current.style.setProperty('--color', `${color}`);
    };

    const colors = [
        {
            id: "1",
            color: "red",
        },
        {
            id: "2",
            color: "blue",
        },
        {
            id: "3",
            color: "green",
        },
        {
            id: "4",
            color: "yellow",
        },
        {
            id: "5",
            color: "#8F00FF",
        },
        {
            id: "6",
            color: "#000",
        },
        {
            id: "7",
            color: "pink",
        },
        {
            id: "8",
            color: "orange",
        },
        {
            id: "9",
            color: "#A8E10C",
        },
        {
            id: "10",
            color: "#00BFFF",
        },
        {
            id: "11",
            color: "#513B1C",
        },
        {
            id: "12",
            color: "#C04000",
        },
        {
            id: "13",
            color: "#550A35",
        },
        {
            id: "14",
            color: "#D462FF",
        },
        {
            id: "15",
            color: "#736AFF",
        },

        {
            id: "16",
            color: "#FF5F1F",
        },
        {
            id: "17",
            color: "#CB6D51",
        },
        {
            id: "18",
            color: "#E30B5D",
        },
        {
            id: "19",
            color: "red",
        },
        {
            id: "20",
            color: "blue",
        },
        {
            id: "21",
            color: "green",
        }
    ];

    const [gifData, setGifData] = useState([]);

    const fetchGifApi = async () => {
        try{
            const res = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "2I8e66Mle4KlTASGNSEBX9LAY7Ahv5zA",
                limit: 100
            }
            });

            setGifData(res.data.data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchGifApi();
    }, []);

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
              api_key: "2I8e66Mle4KlTASGNSEBX9LAY7Ahv5zA",
              q: search,
              limit: 100
            }
          });
          setGifData(res.data.data);
        } catch (err) {
          console.log(err);
        }
    
    };

    const [postName, setPost] = useState();
    const [isPost, setPostVisible] = useState(false);

    const handlePost = (post) => {
        setPost(post);
        setPostVisible(true);
        setTooltip(false);
    };

    const {setToggler} = props;

  return (
    <div className="Menu">
        <div className='Menu_items'>
            <header className="Menu_header">
                <div>
                    <span className="active"><span className="fa fa-pencil"></span> Compose Post</span>
                    <span><span className="fa fa-picture-o"></span> Photo/Video Album</span>
                    <span style={{border: "none"}}><span className="fa fa-video-camera"></span> Live Video</span>
                </div>
                <div style={{textAlign: "right"}}>
                    <span className="fa fa-times" style={{color: "#808080", borderRight: "0px solid #000"}} onClick={() => {setToggler(false);}}></span>
                </div>
            </header>
            <div className="Menu_body">
                <div className="avatar_div">
                    <img className="avatar" src="avatar.png" />
                    <input ref={inputTextColor} className="avatar_input" type="text" placeholder="Write Something Here..." /> 
                </div>
                {
                    isPost ? 
                    <div className="post-style">
                        <img src={postName} />
                    </div>
                    :null
                }
                <div className="color_selector">
                        {
                            
                            <div>
                                <button style={{background: "#e2dce2", marginLeft: "10px"}} onClick={() => handlePicker()}><span className={picker ? "fa fa-caret-left" : "fa fa-caret-right"} style={{color: "#fff"}}></span></button>
                                {
                                    picker ?
                                    <div>
                                        {
                                            colors.map((color) => {
                                                return(
                                                    <button key={color.id} style={{background: `${color.color}`}} onClick={() => {setInputTextColor(color.color);}}></button>
                                                )
                                            })
                                        }
                                        <button style={{display: "block"}} className="plus-btn" onClick={() => handlePicker()}><span className="fa fa-plus"></span></button>
                                    </div>
                                    : null
                                }
                            </div>
                        }
                </div>
                <div className="scroll_Menu">
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-picture-o"></span> Images</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-video-camera"></span> Videos</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-users"></span> Tag Friends</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-map-marker"></span> Check in</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-picture-o"></span> GIFS</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-calendar"></span> Tag Event</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-smile-o"></span> Emoji</span>
                    </div>
                    <div className="Menu_options" onClick={(e) => handleTooltip(e)}>
                        <span><span className="fa fa-music"></span> Music</span>
                    </div>
                </div>
            </div>
            <footer className="Menu_footer">
                <div>
                    <select name="privacy" id="privacy">
                        <option value="onlyme">Only Me</option>
                        <option value="friends">Friends</option>
                        <option value="contacts">Contacts</option>
                        <option value="public">Public</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => {setToggler(false);}}>Post</button>
                </div>
            </footer>
        </div>
        {
                            toolTip ?
                            <div className="tooltip" style={{position: "absolute", top: `${top_pos}px`, left: `${left_pos}px`}}>
                                <div>
                                    <input type="text" onChange={(e) => {handleSearchChange(e); handleSubmit(e);}} />
                                </div>
                                <div>
                                    {gifData.map((gif) => {
                                        return(
                                            <div key={gif.id} onClick={() => handlePost(gif.images.fixed_height.url)}>
                                                <img src={gif.images.fixed_height.url} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            : null
                        }
    </div>
  )
}

export default Menu;
