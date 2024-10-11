import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {useParams} from "react-router-dom";
import {getDetailProductById} from "../../services/services";


const Product = ({ location }) => {
    const { pathname } = location;
    const { id } = useParams();
    const [dataProduct, setDataProduct] = useState({});

    useEffect(async () => {
        fetchDetailProduct();
    }, [id]); // Thêm id vào dependency array

    let fetchDetailProduct = async () =>{
        let res = await getDetailProductById(id)
        if (res && res.errCode === 0) {
            setDataProduct(res.data)

        }
    }
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Product Page</title>
                <meta
                    name="description"
                    content="Product page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Shop Product
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                {/* Kiểm tra nếu chưa có dữ liệu thì không render gì cả */}
                {dataProduct && dataProduct.productDetail && dataProduct.productDetail.length > 0 ? (
                    <div>
                        {/* product description with image */}
                        <ProductImageDescription
                            spaceTopClass="pt-100"
                            spaceBottomClass="pb-100"
                            product={dataProduct}  // Truyền toàn bộ sản phẩm vào component
                        />

                        {/* product description tab */}
                        <ProductDescriptionTab
                            spaceBottomClass="pb-90"
                            productFullDesc={dataProduct.fullDescription}  // Truyền thuộc tính fullDescription
                        />

                         {/*related product slider*/}
                        <RelatedProductSlider
                            spaceBottomClass="pb-95"
                            category={dataProduct.category ? dataProduct.category[0] : ''}  // Truyền category nếu có
                        />
                    </div>
                ) : null} {/* Không hiển thị gì khi dữ liệu chưa có */}
            </LayoutOne>
        </Fragment>
    );

};

Product.propTypes = {
    location: PropTypes.object,
    product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const itemId = parseInt(ownProps.match.params.id, 10);
    return {
        product: state.productData.products.filter(
            single => single.id === itemId
        )[0]
    };
};

export default connect(mapStateToProps)(Product);
