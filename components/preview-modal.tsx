"use client"

 import  React from "react"

 import usePreviewModal from "../hooks/use-preview-model"
import Modal from "./ui/modal"
import Gallery from "../components/gallery/index"
import Info from "./info"

 const PreviewModal = () => {
    // Render the preview modal here
    const previewModal = usePreviewModal()
    const product = usePreviewModal((state) => state.data)

    if(!product) {
        return null; // Return early if no product is selected.
    }
    return ( <Modal
                open={previewModal.isOpen}
                onClose={previewModal.onClose}
            >
                <div className="grid w-full grid-cols-1 items-start gap-y-8 sm:grid-cols-12 lg:gap-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                        <Gallery images={product.images} />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                        <Info data={product} />
                    </div>
                </div>
    </Modal> );
 }
  
 export default PreviewModal;