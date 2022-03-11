# --- 项目路径, git分支名, 项目名, 镜像名, 容器名, 宿主机端口, 容器映射端口
# git_clone_url, branch, dirname, image_name


# 项目名首字母不能大写, 否则新建image_name时会报错.
# 且项目名应和git中的保持一致.
dirname=wiki_bddjango
branch=master
git_clone_url=https://gitee.com/bode135/wiki_bddjango.git


# 是否为私人项目, 如果为1, 则需要加载"authinfo.sh"里的验证信息.
private_project=0


#---  镜像和容器
# 容器名
container_name=$dirname

# 注意: build_new_image为1时, init.sh会删除新建的镜像, runcontainer.sh会创建新的image
# 用image_name创建容器.若build_new_image为0, 则image_name应为"". 注意不能有大写.
build_new_image=1
image_name=$dirname


## --- 端口配置, 如[2103]意为2021年第3个项目, 对应ssh为[22103]
port_host=2298
port_container=80


## --- ssh端口为项目端口前面加个"2"
ssh_port_host=2$port_host
ssh_port_container=22


# --------------- 以下为自动化脚本 -------------


## --- 加载auth信息, 拼凑git_clone_url
authinfo_file_name=authinfo.sh


# 获取能通过验证的git_clone_url
if [ $private_project == "1" ]; then
    if [ -f "$authinfo_file_name" ]; 
    then 
        source authinfo.sh; 
        if [ $username != "" ];
        then
            auth_info=$username:$password
            git_clone_url=`echo $git_clone_url | sed "s/\(:\/\/\)/\1$auth_info@/"`
            echo "****** load authinfo.sh successful!"
        else
            echo "!~~~~~ 加载$authinfo_file_name中的信息时出现错误! ~~~~~~~~~"
            exit
        fi
    else
        echo -e "private_project值为1, 而文件$authinfo_file_name不存在!"
        exit
    fi
fi


echo -e "\n\n------------ git url --------------"
echo -e "\n********* $git_clone_url\n\n";
sleep 0.5


## 镜像名会自动转小写
if [ $build_new_image == "1" ]; then
    image_name=`echo "$dirname" | perl -pe 's/(.*)/\L\1/'`
    echo "********* 脚本将创建一个新的docker镜像: [$image_name]";
    sleep 0.5
fi


echo "******** port: $port_host, ssh_port: $ssh_port_host"

echo
echo "-------- 加载配置信息[config.sh]成功!"
sleep 0.5


# --- 常用调试命令
# docker exec -it $container_name bash
# pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple 
