# pycharm远程docker容器(配置流程)

- [知乎千赞的参考文献](https://zhuanlan.zhihu.com/p/52827335)

> 对上面的文献做一些补充
> - 配置apt加速
> - 改为用ubuntu+python3.6纯净镜像, 不用tensorflow.

## 工作内容

> 纯净版配置apt源

- docker下载ubuntu:16.04纯净版
- 建立并进入容器
- apt-get加速
- 安装必备软件
  - sudo
  - python
    - 安装python3.6
    - 配置python和python3
    - 配置pip和pip3
  - ssh
    - openssh-server
    - 容器ssh配置
- 外部测试
- Pycharm连接容器

## 工作路径设置

> 注意后面build容器时加了当前文件路径映射!!!!!! 最好先cd到要映射的工作路径!!!
> 先创建工作路径并且cd进去, 因为后面加了-v路径映射, 不这么做容易玩崩系统

```
# 进入工作路径
cd ~/mydocker/ssh_docker/

# 没有就先创建
cd ~
mkdir mydocker
cd mydocker
mkdir ssh_docker
cd ssh_docker
```

## 建立容器

### 镜像

```
# --- docker pull公共镜像
# ubuntu太纯净了还得装python3, 麻烦. 但python3.6镜像在apt换源时会报错, python3.7在dockerfile里可以换.

# docker pull ubuntu:16.04
public_image_name=ubuntu:16.04

```

### 容器变量

```
# --- 配置变量

# 新旧镜像名
public_image_name=bode135/bd_ssh_py36
image_name=bd_selenium

# 容器相关变量: 项目名,容器名, 宿主机端口, 容器映射端口, git分支名
dirname=bd_selenium
container_name=bd_selenium

# 项目端口映射
port_host=2104
port_container=80

# ssh端口映射
ssh_port_host=4104
ssh_port_container=22

```

### 开始build

```
# --- 保证没重复建立container
# docker rm -f $container_name


# --- 运行container

# 建立容器

## 目录映射
docker run -itd -p $port_host:$port_container -p $ssh_port_host:$ssh_port_container -v $(pwd):/$dirname --name $container_name $public_image_name

## 不做目录映射
docker run -itd -p $port_host:$port_container -p $ssh_port_host:$ssh_port_container --name $container_name $public_image_name

```

### 进入容器

```
# --- 进入容器
docker exec -it $container_name bash

```



## 容器配置

### 重新设置变量

- 重新输入一遍**容器变量**!

```
container_name=bd_selenium
```

- 进入工作路径

```
cd /$container_name
```



### apt加速下载

- 链接：https://zhuanlan.zhihu.com/p/134810126

```
# apt-get加速
echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata && echo "deb http://mirrors.aliyun.com/debian/ buster main non-free contrib" > /etc/apt/sources.list

```

- 运行截图
  ![运行结果](http://tuchuang-bode135.oss-cn-beijing.aliyuncs.com/img/image-20211113083302240.png)

### apt安装软件

- 参考文献

  - https://www.cnblogs.com/hellojesson/p/11394458.html
  - https://blog.csdn.net/qq_42693848/article/details/88900553

#### apt更新和sudo

```
apt update
apt-get install -y sudo

```

#### python3.6安装和配置

```
# python3.6
## 这俩一起复制运行会报错, 得分开运行..
apt-get install -y python-software-properties  
apt-get install -y software-properties-common

## sudo安装python3.6
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt-get update
sudo apt-get install -y python3.6


# 修改py3.6为默认
sudo ls -l /usr/bin | grep python 
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python3.6 /usr/bin/python
sudo rm /usr/bin/python3
sudo ln -s /usr/bin/python3.6 /usr/bin/python3


# 为python3.6安装对应pip
sudo apt-get install -y python3-pip
sudo ln -s /usr/bin/pip3 /usr/bin/pip

# 更新pip并配置国内镜像源
sudo pip install --upgrade pip
python -m pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

```

#### ssh安装和配置

```
# ssh
apt install -y openssh-server


# ---------- https://www.zhihu.com/search?type=content&q=pycharm%20docker
# mkdir /var/run/sshd
echo 'root:passwd' | chpasswd


sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
echo "export VISIBLE=now" >> /etc/profile
sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# 重新加载! 重点!!!
service ssh restart

```



#### 其它可选软件

> 新版本镜像需要

```
apt install -y vim
apt install -y lsof
apt install -y git

```



## 外部测试

> 测试是否配置成功

```
# ------------- 调试
container_name=bd2102_myblog
ssh_port_host=4202

# 成功会输出0.0.0.0:$container_name
sudo docker port $container_name 22

# ssh root@[your_host_ip] -p $ssh_port_host
# 本机测试用的localhost会有警告, 输入yes, 然后再输入container密码.
ssh root@127.0.0.1 -p $ssh_port_host

```



## 制作镜像

- 制作镜像: https://www.runoob.com/docker/docker-commit-command.html
- 上传docker: https://www.cnblogs.com/caijunchao/p/13341080.html
- 我的镜像`bode135/bd_ssh_py36`: https://hub.docker.com/u/bode135

```
# 更换一个镜像名bd_ssh_py36
docker commit -a "bode" -m "build by Ubuntu and py3.6, use ssh to connect docker." ssh_docker  bd_ssh_py36:v1

# 命名(版本为latest了)
docker tag bd_ssh_py36:v1 bode135/bd_ssh_py36

```



## pycharm配置

- 参考[知乎文献](https://zhuanlan.zhihu.com/p/52827335)



## 其它

### 格式约定

- 约定项目端口号和远程端口号开头两个数字
  - 21和51为正式项目端口
  - 31和41为测试项目端口
- 批量删除`<none>`标签的镜像: https://blog.csdn.net/xl_lx/article/details/81565583

```
docker rmi -f $(docker images | awk '/^<none>/ { print $3 }')
```

### Ubuntu中文乱码

> [解决中文乱码问题](https://blog.csdn.net/w_s_n_b_u_g/article/details/87444391)

```
# --- 修改系统语言

## Dockerfile里设置
ENV LANG C.UTF-8

## 脚本设置
echo "export LC_ALL=C.UTF-8">> /etc/profile && source    /etc/profile

locale
```

