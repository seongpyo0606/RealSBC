import React, { useState } from 'react';
import { postAdd } from '../../api/qnaApi';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function QnaForm() {

    const loginState = useSelector((state) => state.loginSlice)

    const initState = {
        qBoardTitle: '',
        qBoardContent: '',
        member: {
            memberId: loginState.member.memberId,
            memberRole: loginState.member.memberRole,
        },
        file: null
    };


    const [qna, setQna] = useState({ ...initState });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQna((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setQna((prev) => ({
            ...prev,
            file: e.target.files[0] // 파일 선택
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 제출 방지

        const formData = new FormData();
        formData.append("qBoardTitle", qna.qBoardTitle);
        formData.append("qBoardContent", qna.qBoardContent);
        formData.append("memberID", qna.member.memberId);

        // 파일이 선택된 경우에만 추가
        if (qna.file) {
            formData.append("file", qna.file);
        }

        try {
            await postAdd(formData);
            setQna({ ...initState });
            alert("게시글 등록 완료");
            if (loginState.member.memberRole === "ROLE_ADMIN") {
                navigate('/admin/qnas/list');
            } else {
                navigate("/qna/list");
            }
        } catch (error) {
            alert(error.message); // 에러 메시지 표시
            console.error("Error uploading:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">제목</label>
                <input
                    name="qBoardTitle"
                    type="text"
                    value={qna.qBoardTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="제목을 입력하세요"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">내용</label>
                <textarea
                    name="qBoardContent"
                    value={qna.qBoardContent}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="내용을 입력하세요"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">이미지 첨부</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="text-right space-x-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    등록
                </button>
            </div>
        </form>
    );
}

export default QnaForm;
