import { useNavigate } from "react-router-dom";
import { AdminDirectoryPathArrow, AdminProfilePic, AdminSearchIcon } from "../../../Assets"
import "./ProductHeader.css"

import React, { useState } from 'react'

export default function ProductHeader() {
    const [SearchType, setSearchType] = useState(1);
    const navigate = useNavigate();
  return (
    <>
        <div className="prod_head_box">
            <div className="prod_head_title_container">
                <div className="prod_head_title">
                    Manage Products
                </div>

                <img src={AdminProfilePic} alt="" className="prod_head_profile_pic_img" />
            </div>

            <div className="prod_head_add_prod_container">
                <div className="prod_head_dir_path_container">
                    <div className="prod_head_dir_path_content">
                        Dashboard
                    </div>

                    <img src={AdminDirectoryPathArrow} alt="" className="prod_head_dir_path_arrow_img" />

                    <div className="prod_head_dir_path_content" 
                    style={{
                        color:"#667085"
                    }}
                    >
                        Manage Products
                    </div>
                </div>

                <button className="prod_head_add_product_btn" onClick={() =>{
                    navigate("/product_details")
                }}>
                    + Add Product
                </button>
            </div>

            <div className="prod_head_search_row_container">
                <div className="prod_head_search_container">
                    <img src={AdminSearchIcon} alt="" className="prod_head_search_img" />
                    <input type="text" placeholder="Search Product..." className="prod_head_search"
                    onChange={() =>{
                        
                    }}
                    />
                </div>

                <div className="prod_head_search_type_btn_container">
                    <button className={
                        SearchType === 1 
                        ? "prod_head_search_btn_selected prod_head_search_btn_text"
                        : "prod_head_search_btn_unselected prod_head_search_btn_text"
                    } 
                    onClick={() => {
                        setSearchType(1);
                    }}
                    >Search By Name</button>
                    <button className={
                        SearchType === 2
                        ? "prod_head_search_btn_selected prod_head_search_btn_text"
                        : "prod_head_search_btn_unselected prod_head_search_btn_text"
                    }
                    onClick={() => {
                        setSearchType(2);
                    }}
                    >Search By ID</button>
                    
                </div>
            </div>
        </div>
    </>
  )
}
