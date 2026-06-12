"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ButtonLogout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <button
        id="profile-logout-button"
        onClick={() => setShowLogoutModal(true)}
        className="group flex items-center justify-center gap-2 bg--secondary text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
      >
        <span>Log Out</span>
      </button>

      {showLogoutModal && (
        <div
          id="profile-logout-modal"
          className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div
            id="profile-logout-modal-card"
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-8 animate-scale-up"
          >
            <h3
              id="profile-logout-modal-title"
              className="text-xl font-bold text-black text-center mt-4"
            >
              Are you sure you want to Log Out?
            </h3>

            <div
              id="profile-logout-modal-actions"
              className="flex items-center gap-6 mb-2 w-full justify-center"
            >
              <button
                id="profile-logout-cancel"
                onClick={() => setShowLogoutModal(false)}
                className="px-8 py-3 rounded-2xl border border--secondary text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
              >
                No
              </button>
              <button
                id="profile-logout-confirm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-8 py-3 rounded-2xl bg--primary text-white font-bold hover:bg-purple-800 transition-all cursor-pointer shadow-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
