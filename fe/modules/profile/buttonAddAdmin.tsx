"use client";

import { useState } from "react";
import AddAdminModal from "../../components/ui/addAdminModal";

export default function ButtonAddAdmin() {
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowAddAdminModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg--primary text-white font-bold rounded-xl hover:bg-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
                Add Admin
            </button>

            <AddAdminModal
                isOpen={showAddAdminModal}
                onClose={() => setShowAddAdminModal(false)}
            />
        </>
    );
}
