'use server'

import prisma from "@/lib/prisma"

export async function checkAndAddUser(email:string | undefined) {
        if(!email) return
        try {
             const existingUser = await prisma.user.findUnique({
                where : {
                    email
                }
             })
             if(!existingUser){
                await prisma.user.create({
                    data: {email}
                })
                console.log("Nouvelle utilisateur ajouté dans la base de donnée.")
             } else{
                console.log("utilisateur déjà present dans la base de donnée.")
             }
             
        } catch (error) {
            console.error("Erreur lors de la vérification de l'utilisateur:", error)
        }
} 