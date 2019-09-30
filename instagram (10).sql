-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 19, 2017 at 09:11 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instagram`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `imagePath` varchar(1000) DEFAULT NULL,
  `about` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `imagePath`, `about`) VALUES
(3, 'Henry Ford', 'admin@gmail.com', '123', '/assets/images/admin/asda.jpg', ' dhaka'),
(4, 'Mahadi', 'mahadi@gmail.com', '123456', '/assets/images/admin/mahadi@gmail.com.jpg', ' '),
(5, 'Mahadi', 'mahadi@gmail.com', '123456', '/assets/images/admin/mahadi@gmail.com.jpg', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `block_id` int(11) NOT NULL,
  `block_name` varchar(100) NOT NULL,
  `block_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `post_id` varchar(50) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(10) NOT NULL,
  `user_id` int(100) NOT NULL,
  `friend_id` int(100) NOT NULL,
  `miniText` varchar(100) DEFAULT NULL,
  `senderId` int(100) DEFAULT NULL,
  `newMessage` varchar(100) DEFAULT NULL,
  `miniTextTime` varchar(100) DEFAULT NULL,
  `userName` varchar(100) NOT NULL,
  `friendName` varchar(100) NOT NULL,
  `userImage` varchar(500) NOT NULL,
  `friendImage` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `user_id`, `friend_id`, `miniText`, `senderId`, `newMessage`, `miniTextTime`, `userName`, `friendName`, `userImage`, `friendImage`) VALUES
(17, 1, 2, NULL, NULL, '', NULL, 'Asif Tanim', 'Shuvro', '/assets/images/profile/Asif_1_pro_pic.jpg', '/assets/images/profile/Shuvro_2_pro_pic.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `id` int(100) NOT NULL,
  `sender_id` int(100) NOT NULL,
  `receiver_id` int(100) NOT NULL,
  `message` varchar(100) NOT NULL,
  `time` datetime(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notified_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `subject` varchar(300) NOT NULL,
  `info` varchar(500) NOT NULL,
  `time` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(40) NOT NULL,
  `caption` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `upload_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `caption`, `image`, `upload_time`) VALUES
(15, 1, 'Asif Khulna', '/assets/images/post/1504934962237.4434.jpg', '9/9/2017, 11:29:22 AM'),
(17, 2, '\r\n\r\n這個地方很漂亮', '/assets/images/post/1504934995918.8364.jpg', '9/15/2017, 12:22:01 PM'),
(19, 4, 'Comilla TO Dhaka', '/assets/images/post/1504935088717.2454.jpg', '9/14/2017, 12:14:20 AM');

-- --------------------------------------------------------

--
-- Table structure for table `react`
--

CREATE TABLE `react` (
  `id` int(11) NOT NULL,
  `user_id` int(50) NOT NULL,
  `post_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `react`
--

INSERT INTO `react` (`id`, `user_id`, `post_id`) VALUES
(215, 2, 17);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `reported_by` int(11) NOT NULL,
  `posted_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `imagePath` varchar(100) NOT NULL,
  `about` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `online` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `imagePath`, `about`, `status`, `online`) VALUES
(1, 'Asif Tanim', 'asif@gmail.com', '1', '/assets/images/profile/Asif_1_pro_pic.jpg', 'From Khulna\r\n            ', 1, 'true'),
(2, 'Shuvro', 'shuvro@gmail.com', '2', '/assets/images/profile/Shuvro_2_pro_pic.jpg', 'From Dinajpur\r\n            ', 1, 'true'),
(3, 'Alam Alam', 'arefin@gmail.com', '3', '/assets/images/profile/Alam_3_pro_pic.jpg', 'From Ranjpur\r\n            ', 1, ''),
(4, 'Mahadi', 'mahadi@gmail.com', '4', '/assets/images/profile/Mahadi_4_pro_pic.jpg', 'From Comillah', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `react`
--
ALTER TABLE `react`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posted_by` (`posted_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `react`
--
ALTER TABLE `react`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `react`
--
ALTER TABLE `react`
  ADD CONSTRAINT `react_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
