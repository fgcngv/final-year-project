
import Header from "@/components/header";

function OrdersPage({cartQuantity}:{cartQuantity?:number}) {
    return ( 
        <div>
            <Header cartQuantity={cartQuantity}/>
            <div className="pt-18">
            orders page

            </div>
        </div>
     );
}

export default OrdersPage;