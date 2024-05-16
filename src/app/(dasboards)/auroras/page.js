"use client";

import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Input } from "@/components/ui/input";

export default function Auroras() {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [journalTitle, setJournalTitle] = useState("");
  const [journalDes, setJournalDescription] = useState("");
  const [journalMood, setJournalMood] = useState("");
  const [journal, setJournal] = useState([]);
  const [moodBG, setMoodBG] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getCurrentUserJournals(user.email);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = getCurrentDate();

  const createJournal = async (e) => {
    e.preventDefault();

    if (journalTitle === "" || journalDes === "" || journalMood === "") {
      alert("Please fill in all fields");
      return;
    }

    const newJournal = {
      journalTitle,
      journalDes,
      createdBy: user.email,
      journalMood,
      journalDate: currentDate,
      journalId: Math.random().toString(36).substring(2),
    };

    try {
      await addDoc(collection(db, "journals"), newJournal);
      alert("Journal successfully added to Firestore database");
      setMoodBG(moodBG);
      setJournalTitle("");
      setJournalDescription("");
      setJournalMood("");
      setJournal((prevJournals) => [...prevJournals, newJournal]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUserJournals = async (email) => {
    const q = query(collection(db, "journals"), where("createdBy", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      const newJournals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJournal(newJournals);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (journals) => {
    try {
      const journalDoc = journal.find(
        (doc) => doc.journalTitle === journals.journalTitle && doc.createdBy === journals.createdBy
      );

      if (!journalDoc) {
        console.error("Journal not found in Firestore");
        return;
      }

      await deleteDoc(doc(db, "journals", journalDoc.id));

      const updatedJournal = journal.filter((j) => j.journalId !== journals.journalId);
      setJournal(updatedJournal);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="min-h-screen w-full flex select-none">
      <div className="md:w-[20%] md:block hidden bg-purple-950 py-6 px-2">
        <ul className="block space-y-8 text-xl cursor-pointer mt-52">
          <Popover>
            <PopoverTrigger>
              <li className="px-5 py-2 rounded-lg border-2 bg-sky-700 hover:bg-sky-900 duration-300">
                Write today's journal
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <div className="block space-y-4">
                <Input
                  placeholder="Journal Title"
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                />
                <Input
                  placeholder="Journal Description"
                  value={journalDes}
                  onChange={(e) => setJournalDescription(e.target.value)}
                />
                <Input
                  placeholder="Journal Mood"
                  value={journalMood}
                  onChange={(e) => setJournalMood(e.target.value)}
                />
                <button onClick={createJournal} className="px-4 py-2 rounded-xl border-2 border-l-violet-900">
                  Add today's journal✨
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <li className="px-5 py-2 rounded-lg border-2 bg-lime-700 hover:bg-lime-900 duration-300">
                View Profile
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <div className="block space-y-4">
                <img src={user.photoURL} className="w-20 h-20 rounded-full mx-auto my-2" />
                <h2>{user.displayName}</h2>
                <p>{user.email}</p>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <li className="px-5 py-2 rounded-lg border-2 bg-violet-700 hover:bg-violet-900 duration-300">
                Switch Theme
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <div className="block space-y-3">
                <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/tropicalForest")}>
                  Forest🌳
                </button>
                <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/snowMountains")}>
                  Mountains🗻
                </button>
                <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/oceans")}>
                  Ocean🌊
                </button>
                <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/auroras")}>
                  Auroras✨
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <li className="px-5 py-2 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300">Logout</li>
            </PopoverTrigger>
            <PopoverContent>
              <h1>Are you sure?</h1>
              <button className="px-3 py-2 mt-4 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300" onClick={logOut}>
                Yes
              </button>
            </PopoverContent>
          </Popover>
        </ul>
      </div>
      <div className="md:w-[80%] auroraBG flex justify-center items-center relative p-3">
        <h1 className="text-xl md:text-3xl absolute md:top-9 top-28 left-10 md:left-20">
          Hey {user.displayName}👋 welcome to the Auroras✨
        </h1>
        <nav className="p-5 top-0 right-0 absolute">
          <Popover>
            <PopoverTrigger>
              <img src={user.photoURL} className="rounded-full h-16 w-16 cursor-pointer border-4 border-purple-600" alt="user" />
            </PopoverTrigger>
            <PopoverContent>
              <ul className="space-y-4 text-[16px] md:block hidden">
                <li>{user.displayName}</li>
                <li>{user.email}</li>
                <li className="px-3 py-2 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300" onClick={logOut}>
                  Logout
                </li>
              </ul>
              <ul className="md:hidden block space-y-3">
                <Popover>
                  <PopoverTrigger>
                    <li className="px-5 py-2 rounded-lg border-2 bg-sky-700 hover:bg-sky-900 duration-300">Write today's journal</li>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="block space-y-4">
                      <Input
                        placeholder="Journal Title"
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                      />
                      <Input
                        placeholder="Journal Description"
                        value={journalDes}
                        onChange={(e) => setJournalDescription(e.target.value)}
                      />
                      <Input
                        placeholder="Journal Mood"
                        value={journalMood}
                        onChange={(e) => setJournalMood(e.target.value)}
                      />
                      <button onClick={createJournal} className="px-4 py-2 rounded-xl border-2 border-l-violet-900">
                        Add journal✨
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <li className="px-5 py-2 rounded-lg border-2 bg-purple-700 hover:bg-purple-900 duration-300">View Profile</li>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="block space-y-4">
                      <img src={user.photoURL} className="w-20 h-20 rounded-full mx-auto my-2" />
                      <h2>{user.displayName}</h2>
                      <p>{user.email}</p>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <li className="px-5 py-2 rounded-lg border-2 bg-violet-700 hover:bg-violet-900 duration-300">Switch Theme</li>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="block space-y-3">
                      <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/tropicalForest")}>
                        Forest🌳
                      </button>
                      <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/snowMountains")}>
                        Mountains🗻
                      </button>
                      <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/oceans")}>
                        Ocean🌊
                      </button>
                      <button className="px-4 py-2 rounded-xl border-2 border-violet-900" onClick={() => router.push("/auroras")}>
                        Auroras✨
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <li className="px-5 py-2 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300">Logout</li>
                  </PopoverTrigger>
                  <PopoverContent>
                    <h1>Are you sure?</h1>
                    <button className="px-3 py-2 mt-4 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300" onClick={logOut}>
                      Yes
                    </button>
                  </PopoverContent>
                </Popover>
              </ul>
            </PopoverContent>
          </Popover>
        </nav>
        <div className="block space-y-4">
          <h1 className="text-3xl text-center text-purple-400 md:mt-4 mt-24">Your Journals 📖</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 space-y-4">
            {journal.map((j) => (
              <div key={j.journalId} className="cardJournal rounded-xl border border-white border-opacity-20 p-3 space-y-4 h-auto w-full">
                <div className="flex justify-between gap-6 px-4">
                  <h2 className="text-xl">{`Date: ${j.journalDate}`}</h2>
                  <h1 className="rounded-[30px] h-auto px-2 py-3 text-gray-300 bg-violet-800">{j.journalMood}</h1>
                </div>
                <div className="block space-y-4">
                  <h1 className="text-purple-300 text-xl">{j.journalTitle}</h1>
                  <p className="text-purple-400 text-sm">{j.journalDes}</p>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <button className="border-2 border-red-600 rounded-xl bg-red-400 text-red-50 px-4 py-2">Delete</button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="block space-y-4">
                      <h1>Are you sure you want to delete this precious journal?</h1>
                      <button className="border-2 border-red-600 rounded-xl bg-red-400 text-red-50 px-4 py-2" onClick={() => deleteTask(j)}>
                        Yes
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
