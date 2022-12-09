import React from 'react'

export const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-white text-muted">
            <section className="pt-1">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-3">
                                <i className="fas fa-gem me-3 text-secondary"></i>Findhome
                            </h6>
                            <p>Tìm phòng nhanh, chất lượng</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-3">
                                Hỗ trợ
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Trung tâm trợ giúp</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Quyền riêng tư</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Quy định cần biết</a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-3">
                                Về Findhome
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Giới thiệu</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Chính sách</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Truyền thông</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
                            <h6 className="text-uppercase fw-bold mb-3">Liên hệ</h6>
                            <p><i className="fas fa-home me-3 text-secondary"></i> Hai Bà Trưng, Hà Nội</p>
                            <p>
                                <i className="fas fa-envelope me-3 text-secondary"></i>
                                findroomsp@gmail.com
                            </p>
                            <p><i className="fas fa-phone me-3 text-secondary"></i> 0912345678</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}>
                © 2022 Copyright:
                <span className="text-reset fw-bold"> Findroom.com</span>
            </div>
        </footer>
    )
}
