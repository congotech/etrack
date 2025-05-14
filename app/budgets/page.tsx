'use client'
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import { error } from 'console';
import { addBudget } from '../action';
import Notification from '../components/Notification';

const page = () => {

  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [showEmojiPicker, steShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectEmoji] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const closeNotification = () => {
      setNotification("");
  }

  const handleEmojiSelect = (emojiObject : {emoji : string}) => {
    setSelectEmoji(emojiObject.emoji)
    steShowEmojiPicker(false)
  }

  const handleAddBudget = async () => {
    try {
      const amount = parseFloat(budgetAmount)
      if(isNaN(amount) || amount <= 0) {
        throw new Error("Le montant doit être un nombre positif.")
      }
      await addBudget(
        user?.primaryEmailAddress?.emailAddress as string, 
        budgetName,
        amount,
        selectedEmoji
      )
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement
      if(modal){
        modal.close()
      }
      setNotification("Nouveau budget crée avec succès.")
      setBudgetName("")
      setBudgetAmount("")
      setSelectEmoji("")
      steShowEmojiPicker(false)
    } catch (error) {
      setNotification(`Erreur lors de la création du budget: ${error}`)
    }
  }

  return (
    <Wrapper>

    {notification && (
      <Notification message={notification} onClose={closeNotification}></Notification>
    )}

      <button
        className="btn"
        onClick={() => (document.getElementById('my_modal_3') as
          HTMLDialogElement).showModal()}
      >
        Nouveau Budget
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Création d'un bugdet</h3>
          <p className="py-4">Permet de contrôler ses dépenses facilement</p>
          <div className='w-full flex flex-col items-stretch'>
            <input
              type="text"
              value={budgetName}
              placeholder="Nom du budget"
              onChange={(e) => setBudgetName(e.target.value)}
              className="input input-bordered mb-3 w-full"
              required
            />

            <input
              type="number"
              value={budgetAmount}
              placeholder="Montant du Budget"
              onChange={(e) => setBudgetAmount(e.target.value)}
              className="input input-bordered mb-3 w-full"
              required
            />
            <button
              className='btn mb-3'
              onClick={() => steShowEmojiPicker(!showEmojiPicker)}
            >
              {selectedEmoji || "Sélectionnez un emoji"}
            </button>
            {showEmojiPicker && (
              <div className='flex justify-center items-center my-4'>
                <EmojiPicker onEmojiClick={handleEmojiSelect}/>
              </div>
            )}

            <button 
              onClick={handleAddBudget}
              className='btn'
            >
              Ajouter Budget
            </button>
          </div>
        </div>
      </dialog>
    </Wrapper>);

};

export default page
