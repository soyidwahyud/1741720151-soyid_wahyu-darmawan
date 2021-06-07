-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2021 at 08:33 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digital_repository`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` int(11) NOT NULL,
  `nama_admin` varchar(100) NOT NULL,
  `username_admin` varchar(100) NOT NULL,
  `email_admin` varchar(100) NOT NULL,
  `password_admin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama_admin`, `username_admin`, `email_admin`, `password_admin`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '$2b$12$h1PC7eZ2lUWj1ZpmrONLle11CZbKNFtEH54m9ddfb3F6fpej8tnb2'),
(4, 'admin', 'admin', 'admin@ymail.com', '$2b$12$Y8BgxZoXYLnFHNo/tOaaL.26ZNcuI1MRbqk.ldu0Bo4sPHCl4UcqK'),
(5, 'adminn', 'adminn', 'adminn@ymail.com', '$2b$12$xzdi9JimLqaFPzi3higgLu/VVxeivWu.5ANdRJdCHHDALt2bf.uNy'),
(6, 'soyid', 'soyid', 'soyid@gmail.com', '$2b$12$x3NzrqcQN42ZFTHRX6HWhe/r5iJDRg3Ne/xne3BB0U9RKX9w3UlkK');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_buku`
--

CREATE TABLE `tbl_buku` (
  `id_buku` int(11) NOT NULL,
  `kode_buku` varchar(100) NOT NULL,
  `nama_buku` varchar(255) NOT NULL,
  `id_jenis` int(11) NOT NULL,
  `id_nakes` int(11) NOT NULL,
  `id_penerbit` int(11) NOT NULL,
  `id_penulis` int(11) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `userfile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_buku`
--

INSERT INTO `tbl_buku` (`id_buku`, `kode_buku`, `nama_buku`, `id_jenis`, `id_nakes`, `id_penerbit`, `id_penulis`, `gambar`, `userfile`) VALUES
(1, 'B1', 'Leading and Managing in Nursing', 3, 2, 3, 2, 'TXUcJN4CaVokRA.JPG', 'fBWxPzsLHC8nuw.pdf'),
(2, 'B2', 'Assessment and Management of Clinical Problems', 3, 2, 4, 3, 'z1gqzu4HSZORDQ.JPG', 'b18LzB7SjFZcoQ.pdf'),
(3, 'B3', 'Nursing Interventions and Collaborative Management', 3, 2, 5, 4, 'CzswMq4T09pE5Q.JPG', 'JPqQmREDdXNTjA.pdf'),
(4, 'B4', 'Netter’s  Pediatrics', 4, 2, 6, 5, 'zDABGgqDfG23DQ.JPG', 'FZ0qWxLVrDQkQg.pdf'),
(5, 'B5', 'Drug–Drug Interaction Primer', 5, 3, 7, 1, 'fAnlfIAWKPw7SA.JPG', 'Gj8PT_M3EG11ww.pdf'),
(6, 'B6', 'Clinical Manual of Drug  Interaction Principles for Medical Practice', 5, 3, 7, 6, '80K74lqvRatY5w.JPG', 'XhqwPtRPGFVXQQ.pdf'),
(7, 'B7', 'Atlas of Human Anatomy', 1, 1, 8, 7, 'o5xg8q60gR-kMQ.JPG', 'iCzfD1VG0RRkEA.pdf'),
(8, 'B8', 'Guyton and Hall Textbook of Medical Physiology', 2, 1, 5, 8, 'vyXO-WqIIGKEPw.JPG', '7H_Eu4hVRR1HSw.pdf'),
(9, 'B9', 'Drugs And Human Location', 5, 3, 3, 5, 'St3nn0-gNdzUdA.JPG', 'aeGCiPwsMJOdvA.pdf'),
(10, 'B10', 'PRESCRIBING FOR ELDERLY PATIENTS', 6, 3, 10, 10, '-ke0w4Tu1V-Owg.JPG', 'ro9WzAvxHQaqqA.pdf'),
(12, 'B12', 'Bailey & Loves Essential Clinical Anatomy', 1, 1, 11, 12, 'UjDt8Lg_x-H0-w.JPG', 'lf4hQ7QriaixSQ.pdf'),
(13, 'B11', 'Larsens Human  Embryology', 7, 1, 10, 11, '6c_JGvY2DqneIg.JPG', 'otQ1waJeqwfa4Q.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jenis`
--

CREATE TABLE `tbl_jenis` (
  `id_jenis` int(11) NOT NULL,
  `jenis_buku` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_jenis`
--

INSERT INTO `tbl_jenis` (`id_jenis`, `jenis_buku`) VALUES
(1, 'Anatomy'),
(2, 'Psychology'),
(3, 'Medikal surgical'),
(4, 'Pediatrik'),
(5, 'Drugs '),
(6, 'Prescribing'),
(7, 'Embryology'),
(8, 'Urology');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kriteria`
--

CREATE TABLE `tbl_kriteria` (
  `id_kriteria` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama_kriteria` varchar(100) NOT NULL,
  `bobot` float NOT NULL,
  `tipe_kriteria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_kriteria`
--

INSERT INTO `tbl_kriteria` (`id_kriteria`, `kode`, `nama_kriteria`, `bobot`, `tipe_kriteria`) VALUES
(1, 'C1', 'kelayakan isi', 0.3, 'benefit'),
(2, 'C2', 'kebahasaan', 0.25, 'benefit'),
(3, 'C3', 'penyajian', 0.28, 'benefit'),
(4, 'C4', 'kegrafikaan', 0.17, 'benefit');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nakes`
--

CREATE TABLE `tbl_nakes` (
  `id_nakes` int(11) NOT NULL,
  `tenaga_kesehatan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_nakes`
--

INSERT INTO `tbl_nakes` (`id_nakes`, `tenaga_kesehatan`) VALUES
(1, 'Kedokteran'),
(2, 'Keperawatan'),
(3, 'Farmasi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nilai_buku`
--

CREATE TABLE `tbl_nilai_buku` (
  `id_nilai_buku` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_buku` int(11) NOT NULL,
  `kelayakan_isi` float NOT NULL,
  `kebahasaan` float NOT NULL,
  `penyajian` float NOT NULL,
  `kegrafikaan` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_nilai_buku`
--

INSERT INTO `tbl_nilai_buku` (`id_nilai_buku`, `id_user`, `id_buku`, `kelayakan_isi`, `kebahasaan`, `penyajian`, `kegrafikaan`) VALUES
(1, 1, 1, 6, 5, 7, 8),
(2, 1, 2, 9, 6, 8, 5),
(3, 1, 3, 4, 4, 8, 6),
(4, 1, 4, 5, 7, 6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penerbit`
--

CREATE TABLE `tbl_penerbit` (
  `id_penerbit` int(11) NOT NULL,
  `nama_penerbit` varchar(100) NOT NULL,
  `tahun_terbit` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_penerbit`
--

INSERT INTO `tbl_penerbit` (`id_penerbit`, `nama_penerbit`, `tahun_terbit`) VALUES
(1, 'Erlangga', '2018'),
(2, 'Yudhistira', '2018'),
(3, 'Elsevier', '2019'),
(4, 'Elsevier', '2020'),
(5, 'Elsevier', '2016'),
(6, 'Elsevier', '2011'),
(7, 'American Psychiatric', '2007'),
(8, 'Elsevier', '2018'),
(9, 'Elsevier', '2014'),
(10, 'Wiley-Blackwell', '2009'),
(11, 'Paperback', '2018');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penulis`
--

CREATE TABLE `tbl_penulis` (
  `id_penulis` int(11) NOT NULL,
  `nama_penulis` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_penulis`
--

INSERT INTO `tbl_penulis` (`id_penulis`, `nama_penulis`) VALUES
(1, 'Neil B. Sandsom'),
(2, 'Patricia S. Yoder-Wise'),
(3, 'Harding Kwong Roberts'),
(4, 'Marianne Saunorus Baird'),
(5, 'Todd A. Florin'),
(6, 'Gary H. Wynn'),
(7, 'Frank H. Netter'),
(8, 'John E. Hall'),
(9, 'Edwar C. Webber'),
(10, 'Stephen Jackson'),
(11, 'Gary C. Schoenwolf'),
(12, 'John S.P. Lumley');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ulasan`
--

CREATE TABLE `tbl_ulasan` (
  `id_ulasan` int(11) NOT NULL,
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `pesan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ulasan`
--

INSERT INTO `tbl_ulasan` (`id_ulasan`, `nama_depan`, `nama_belakang`, `email`, `judul`, `pesan`) VALUES
(1, 'Soyid', 'Wahyu', 'wahyu@email.com', 'ini judul', 'ini pesan');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int(11) NOT NULL,
  `nik` varchar(11) NOT NULL,
  `nama_user` varchar(100) NOT NULL,
  `username_user` varchar(100) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(100) NOT NULL,
  `id_jabatan` int(11) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `notelp` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `nik`, `nama_user`, `username_user`, `email_user`, `password_user`, `id_jabatan`, `alamat`, `notelp`) VALUES
(1, '010101', 'user', 'user', 'user@gmail.com', '$2b$12$YQ5PQp/Mvkt8tJUDjTxGlebrJne1KSnG7Rviu2.JjigGdhSZL3wau', 1, 'Bekasi', '08113145679'),
(2, '123456', 'wahyu', 'wahyu', 'wahyu@y.com', '$2b$12$fATtHkDjxt4OTwJqGhOHiem5N9BIaZK1TGoP8VX9EZvF0v0FFK8BK', 0, 'jakarta', '02187656651'),
(3, '121212121', 'tes', 'tes', 'tes@ymail.com', '$2b$12$HJj3ojGv3BgWvw6EY7Dnp.cv/CQpJhWKj1ySr8TGvmJQeRfQndjbS', 0, 'tes', '0123987676');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `tbl_buku`
--
ALTER TABLE `tbl_buku`
  ADD PRIMARY KEY (`id_buku`),
  ADD KEY `id_jenis` (`id_jenis`),
  ADD KEY `id_penerbit` (`id_penerbit`),
  ADD KEY `id_penulis` (`id_penulis`),
  ADD KEY `id_nakes` (`id_nakes`);

--
-- Indexes for table `tbl_jenis`
--
ALTER TABLE `tbl_jenis`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `tbl_kriteria`
--
ALTER TABLE `tbl_kriteria`
  ADD PRIMARY KEY (`id_kriteria`);

--
-- Indexes for table `tbl_nakes`
--
ALTER TABLE `tbl_nakes`
  ADD PRIMARY KEY (`id_nakes`);

--
-- Indexes for table `tbl_nilai_buku`
--
ALTER TABLE `tbl_nilai_buku`
  ADD PRIMARY KEY (`id_nilai_buku`),
  ADD KEY `id_buku` (`id_buku`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tbl_penerbit`
--
ALTER TABLE `tbl_penerbit`
  ADD PRIMARY KEY (`id_penerbit`);

--
-- Indexes for table `tbl_penulis`
--
ALTER TABLE `tbl_penulis`
  ADD PRIMARY KEY (`id_penulis`);

--
-- Indexes for table `tbl_ulasan`
--
ALTER TABLE `tbl_ulasan`
  ADD PRIMARY KEY (`id_ulasan`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_jabatan` (`id_jabatan`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_buku`
--
ALTER TABLE `tbl_buku`
  ADD CONSTRAINT `tbl_buku_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `tbl_jenis` (`id_jenis`),
  ADD CONSTRAINT `tbl_buku_ibfk_2` FOREIGN KEY (`id_penerbit`) REFERENCES `tbl_penerbit` (`id_penerbit`),
  ADD CONSTRAINT `tbl_buku_ibfk_3` FOREIGN KEY (`id_penulis`) REFERENCES `tbl_penulis` (`id_penulis`),
  ADD CONSTRAINT `tbl_buku_ibfk_4` FOREIGN KEY (`id_nakes`) REFERENCES `tbl_nakes` (`id_nakes`);

--
-- Constraints for table `tbl_nilai_buku`
--
ALTER TABLE `tbl_nilai_buku`
  ADD CONSTRAINT `tbl_nilai_buku_ibfk_1` FOREIGN KEY (`id_buku`) REFERENCES `tbl_buku` (`id_buku`),
  ADD CONSTRAINT `tbl_nilai_buku_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tbl_user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
