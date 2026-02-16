<?php
interface PHPInterface
{
    public function run();
}

class StartPhpLearning implements PHPInterface{
    public function run(){
        return 5 + 5;
    }
}

class TestClass
{
    public static function test(PHPInterface $obj)
    {
        return $obj->run();
    }
}

class TestClass2 extends TestClass{
    public static function test2(){
        return static::class;
    }
}

$learning = new StartPhpLearning();
?>

<style>
    body{
        height: 100vh;
    }
    .container{
        width: 50%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
    .flex{
        display: flex;
        gap: 15px;
    }
    .flex-col{
        flex-direction: column;
    }
</style>

<div class="container">
    <div class="flex flex-col">
        <div>Версия PHP: <?= phpversion() ?></div>
        <div><?=TestClass::test($learning)?></div>
        <div><?=TestClass2::test2()?></div>
    </div>
</div>
