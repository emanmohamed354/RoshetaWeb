import { useContext } from "react";
import { Container } from "react-bootstrap";
import { FetchWishlistContext } from "../../../Context/WishList";

const WishListPage = () => {
    const { numOfWishlistItems, wishlist } = useContext(FetchWishlistContext);

    const wishlistItems = wishlist?.result || [];

    return (
        <Container>
            <h4>My WishList</h4>
            <p>Number of Items in Wishlist: {numOfWishlistItems}</p>
            <div>
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((item, index) => (
                        <div key={index}>
                            <p>Name: {item.name}</p> {/* Assuming 'name' is a property of the product object */}
                            <p>Quantity: {item.quantity || 1}</p> {/* Default to 1 if quantity is not defined */}
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </Container>
    );
};

export default WishListPage;
