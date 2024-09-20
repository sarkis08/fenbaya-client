"use client"

import React from "react";
import axios from "axios"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Button from "../../../../components/ui/button";
import { Currency } from "../../../../components/ui/currency";
import useCart from "../../../../hooks/use-cart";


const Summary = () => {
    const searchParams = useSearchParams()
    const items = useCart((state) => state.items)
    const removeAllItems = useCart((state) => state.removeAllItems)

    useEffect(() => {
        if(searchParams.get("success")) {
            toast.success("Payment successful!")
            removeAllItems()
        }

        if(searchParams.get("canceled")) {
            toast.error("Payment canceled!")
        }
    }, [searchParams, removeAllItems])

    const totalPrice = items.reduce((total, item) => {
       // return total + (item.price * item.quantity)
       return total + Number(item.price)
    }, 0)

    const onCheckout = async () => {
        const response = await axios.post("http://localhost:3000/api/66de4a96-47fc-4e55-94f8-c9b38d9b3c25/checkout", {
            productIds: items.map((item) => item.id),
        })

        console.log(response);
        

        window.location = response.data.url
    }

    return ( <div className="mt-16 rounded-lg bg-slate-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">
            Order Sumarry
        </h2>
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                    Order Total
                </div>
                <Currency value={totalPrice} />
            </div>
        </div>
        <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">Checkout</Button>
    </div> );
}
 
export default Summary;