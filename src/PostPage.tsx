// 投稿ページ
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./axiosConfig";

// interfaceによるpropsの型の設定
interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {

    // useStateのよるデータ管理
    const [ category, setCategory ] = useState< string | null >(null);
    const [ isCategoryOpen, setIsCategoryOpen ] = useState<boolean>( false );
    const [ income, setIncome ] = useState<string>("");
    const [ title, setTitle ] = useState('');
    // useNavigateを宣言（useNavigate: 任意のタイミング（クリック等）のページ遷移の際使用）
    const navigate = useNavigate();

    // 投稿フォームの送信処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && income && category){
           const newPost = {
                post: {
                    title,
                    income: Number(income),
                    categories: [category],
                }
            };

            try{
                await api.post( '/posts', newPost );
                setTitle("");
                setIncome("");
                setCategory(null);
                setIsCategoryOpen(false);
                navigate("/");
            } catch ( error ){
                console.error( "Error creating post:", error );

                
                alert( "投稿の作成に失敗しました。" );
            }
        }else{
            alert("カテゴリ、年収、タイトルは必須項目です。")
        }
    };

   
    return(
        <>
        {/* console.log("Sending newPost:", newPost); */}
        
        {/* ヘッダー */}
        <header>
            <nav className='bg-blue-900 p-3 flex items-center'>
                <h1 className='text-2xl text-neutral-50 ml-2'>求人検索アプリ</h1>
                <div className='flex ml-auto'>
                <p className='text-1xl text-neutral-50 ml-2 mr-3 '>求人検索</p>
                <Link to="/search" className='text-1xl text-neutral-50 ml-2 mr-3'>求人投稿</Link>
                </div>
            </nav> 
        </header>

        {/*入力欄 */}
        <main>
            <h1 className="font-bold text-2xl m-4 ml-10">求人投稿</h1>
            <div className="ml-10">
                <form onSubmit={handleSubmit}>
                    {/* カテゴリ入力欄 */}
                    <div>
                        <p className="my-2">求人カテゴリを選択</p>
                        <button type="button"
                            onClick={ () => setIsCategoryOpen(!isCategoryOpen)}
                            className="border w-56 p-1">
                            {category ? category :  'カテゴリを選択 '}{isCategoryOpen ? " ▲ " : " ▼ "}
                        </button>
                        { isCategoryOpen && (
                            <div className="">
                                 {['事務','エンジニア','デザイン','マーケティング','財務・経理','人事','カスタマーサポート','製造','医療・介護'].map(( cat ) => (
                                    <div key={ cat } className="">
                                        <input 
                                            type="radio"
                                            id={cat}
                                            name="category"
                                            checked = { category === cat }
                                            onChange={ () => {
                                                setIsCategoryOpen(false);
                                                setCategory( cat );}}
                                            className="" 
                                        />
                                         <label htmlFor = {cat}>{cat}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                                        
                    {/*年収入力欄 */}
                    <label>
                        <p className="my-2">年収（万円）</p>
                        <input 
                        type=" number " 
                        id = "income"
                        name="income"
                        value={ income } 
                        onChange={(e) => setIncome ( e.target.value )}
                        
                        className="border p-1 w-56"
                        />
                    </label>

                    {/* タイトル入力欄 */}
                    <label>
                        <p className="my-2">求人タイトル</p>
                        <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border w-[90%] p-1"
                        />
                    </label>
                    <br /><br />
                    <button className="my-2 py-2 text-neutral-50 bg-sky-400 rounded-md hover:bg-sky-600 px-4 w-56" type = 'submit'>投稿</button>
                </form>
            </div>
        </main>
        </>


    )
}

                

                

export default PostPage;